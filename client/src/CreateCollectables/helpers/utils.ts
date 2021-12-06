import { TokenMetadata } from "../../store/metadataStore/types"
import { FolderState, Asset } from '../../store/assetsStore/types'
import { OutputImageConf } from '../../store/algorithmSetupStore/types'
import { SERVER_URL, endpoints } from "../../http-conf/request"

export type RequestConfig = {
    metadata: TokenMetadata
    outputConf: OutputImageConf
    assetsSlices: FolderState[]
}

type ServerAsset = { name: string, url: string }

const convertAssets = (filesList: File[]): Promise<Asset[]> => {
    return new Promise ((resolve) => {
        const assets = filesList.map((file: File): Promise<ServerAsset> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve({ name: file.name, url: reader.result as string});
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            })
        })

        Promise.all(assets)
            .then(assets => {
                resolve(assets.map((asset, idx) => ({ ...asset, id: new Date().getTime() * idx })))
            })
            .catch(error => {
                throw new Error(`Error! ${error}`)
            })
    })
}

export const validateAssetName = (name: string): boolean => `${name}`.match(/#\d+\.png$/) ? true : false
export const toNumberValue = (value: string): number => isNaN(parseInt(value)) ? 0 : parseInt(value)

export const validateConf = (data: TokenMetadata | OutputImageConf): boolean | void => { 
    const entries = Object.entries(data)
    for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i] as [string, any]

        if (typeof value !== 'boolean' && !value) return true
        if (typeof value === 'string' && value.length === 0) return true
        if (key === 'backgroud_color_rgba') {
            const arr = value.split(',')
            if (arr.length !== 4) return true
            const reducer = (acc: boolean, curr: string) => !acc ? acc : JSON.stringify(parseInt(curr)) === curr.trim()
            if (!arr.reduce(reducer, JSON.stringify(parseInt(arr[0])) === arr[0])) return true
        }
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                if (value.length === 0) return true
                for (const item of value) {
                    const isNotValid = validateConf(item)
                    if (isNotValid) return true
                }
                if (key === 'creators' && value.reduce((acc, curr) => acc + curr.share, 0) !== 100) return true
            } 
            if (validateConf(value)) return true
        }
    }
}

const generatorAvaliable = (conf: RequestConfig): boolean => {
    let isDisabled: boolean = false
    const { metadata, assetsSlices, outputConf } = conf
    
    if (validateConf(metadata) || validateConf(outputConf)) return true

    if (assetsSlices.length !== 0) { 
        const folderNames: string[] = []
        for (let i = 0; i < conf.assetsSlices.length; i++) {
            const folder = conf.assetsSlices[i]
            isDisabled = folderNames.indexOf(folder.folderName) !== -1 ? true : false

            if (folder.assets.length === 0) isDisabled = true
            if (isDisabled) break

            for (let j = 0; j < folder.assets.length; j++) {
                if (!validateAssetName(folder.assets[j].name)) {
                    isDisabled = true
                    break
                }
            }
        }
    } else {
        isDisabled = true
    }
    return isDisabled
}

export const generateAssets = async (requestConfig: RequestConfig): Promise<boolean | void> => {
    const data = {
        ...requestConfig,
        metadata: {
            ...requestConfig.metadata,
            properties: {
                ...requestConfig.metadata.properties,
                creators: requestConfig.metadata.properties.creators.map(({ address, share }) => ({ address, share }))
            }
        }
    }
    try {
        const response = await fetch(SERVER_URL + endpoints.createAssets, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        if (response.ok) {
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = 'assets'
            document.body.appendChild(link)
            link.click()
            link.remove()
            return true
        }
    } catch (error) {
        console.error(error)
        return false
    }

}

export { convertAssets, generatorAvaliable }