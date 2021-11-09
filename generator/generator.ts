import path from 'path'
import type { TConfig, TContentItem, TMetadata } from './types'
import fs from 'fs'
import mergeImages from './merge_image'

const PATH_ROOT = path.join(__dirname, '..')

type TGenerator = {
    content: TContentItem[]
    generate: (count: number) => TContentItem[]
    drawImages: () => string
}

class RandomImagesGenerator implements TGenerator {
    private _content: TContentItem[] = []
    private _sequences: string[] = []
    private _imagesDirList: string [] = []
    private _maxSequencesCount: number = 0
    private _config: TConfig = null
    private _metadata: TMetadata = null

    private _choices(names: string[], weights: number[]): [string, string] {
        const sum = weights.reduce((prev, curr) => prev + curr, 0);
        let acc = 0;
        weights = weights.map(percent => (acc = percent + acc));        
        let randomNumber = Math.random() * sum;
        const element = names[weights.filter(percent => percent <= randomNumber).length]

        return [element, `${names.indexOf(element)}`]
    }

    private _calculateMaxSequenciesCount(): number {
        let totalSequenceAmount: number = 0
        for (const imageDir of this._imagesDirList) {
            const variantsCount = fs.readdirSync(path.join(PATH_ROOT, 'images', imageDir)).length
            totalSequenceAmount = !totalSequenceAmount ? variantsCount : totalSequenceAmount * variantsCount
        }

        return totalSequenceAmount
    }

    private _checkIsUniqueSequence(sequence: string): boolean {
        let isUnique: boolean = true
        for (const existesSequence of this._sequences) {
            if (existesSequence === sequence) {
                isUnique = false
                break
            }
        }

        return isUnique
    }

    constructor(imagesDirList: string[], metadata: TMetadata, config: TConfig) {
        this._imagesDirList = imagesDirList
        this._metadata = metadata
        this._config = config
        this._maxSequencesCount = this._calculateMaxSequenciesCount()
    }

    get content (): TContentItem[] { return this._content }

    generate(count: number = 1, sequencesIsUnique: boolean = true): TContentItem[] {
        const content: TContentItem[] = []
        
        while (count > 0) {
            if (this._sequences.length >= this._maxSequencesCount && sequencesIsUnique) {
                console.log(`The maximum possible number of sequences was generated: ${this._maxSequencesCount}`)
                break
            }

            const image: TContentItem = {}
            let sequence: string = ''

            for (let dirName of this._imagesDirList) {
                let contentList: string[] = fs.readdirSync(path.join(__dirname, '..', 'images', dirName))
                const names: string[] = []
                const percents: number[] = []

                for (const filename of contentList) {
                    let [ name, percent ]: string[] = filename.split('.')[0].split('#')
                    names.push(name)
                    percents.push(Number(percent))
                }

                let [ result, index ] = this._choices(names, percents)
                image[dirName] = result
                sequence += index
            }
            
            if (sequencesIsUnique) {
                if (this._checkIsUniqueSequence(sequence)) {
                    this._sequences.push(sequence)
                    content.push(image)
                    count--
                }
            } else {
                this._sequences.push(sequence)
                content.push(image)
                count--
            }
        }

        this._content = content
        return content
    }

    drawImages(): string {
        if (this._content.length == 0) {
            throw new Error(`You have not generate images: content = ${this._content.length}'`)
        }

        const outputDirPath = path.join(PATH_ROOT, 'assets')

        if (fs.existsSync(outputDirPath)) fs.rmSync(outputDirPath, { recursive: true })
        fs.mkdirSync(outputDirPath)

        if (!this._metadata) throw new Error('Token metadata cannot be empty.')

        let counter: number = 0

        const config = JSON.parse(JSON.stringify(this._config).replace('backgroud_color_rgba', 'backGroundColor'))
        for (const imageSettings of this._content) {

            mergeImages(`${counter}`, imageSettings, outputDirPath, config)

            let settings: TMetadata = {
                ...this._metadata,
                symbol: `${this._metadata.symbol}-${counter}`,
                name: `${this._metadata.name} #${counter}`,
                image: `${counter}.png`,
                properties: {
                    ...this._metadata.properties,
                    files: [{ uri: `${counter}.png`, type: 'image/png' }],
                },
                attributes: Object.entries(imageSettings).map(([ trait_type, value ]) => ({ trait_type, value }))
            }

            fs.writeFileSync(path.join(outputDirPath, `${counter}.json`), JSON.stringify(settings))
            counter++
        }

        return 'Success!'
    }
}

export default RandomImagesGenerator