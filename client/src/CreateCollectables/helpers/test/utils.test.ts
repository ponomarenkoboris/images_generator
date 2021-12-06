import { OutputImageConf } from '../../../store/algorithmSetupStore/types'
import { TokenMetadata } from '../../../store/metadataStore/types'
import { validateAssetName, toNumberValue, validateConf } from '../utils'

const metadata: TokenMetadata = {
    name: 'Name',
    symbol: 'SYMB',
    description: 'Some description',
    seller_fee_basis_points: 100,
    collection: {
        name: 'Mock',
        family: 'Mocks'
    },
    properties: {
        category: 'image',
        creators: [
            {
                address: 'sdkfjasfdslkfdlf9',
                share: 100
            }
        ]
    }
}

const algConf: OutputImageConf = {
    images_count: 1,
    size: {
        height: 1416,
        width: 672
    },
    time_limit: false,
    sequences_is_unique: false,
    backgroud_color_rgba: '0, 0, 0, 255'
}

describe('Testing collection create utils', () => {
    it('should validate asset name', () => {
        const assteName = 'fish#10.png'
        const assteName1 = 'fish#10.pn'
        const assteName2 = 'fish10.png'
        const assteName3 = 'fish#10png'

        expect(validateAssetName(assteName)).toBe(true)
        expect(validateAssetName(assteName1)).toBe(false)
        expect(validateAssetName(assteName2)).toBe(false)
        expect(validateAssetName(assteName3)).toBe(false)
    })

    it('should convert string value to number', () => {
        const value = '123'
        const value1 = '1$23'
        const value2 = 'value'

        expect(toNumberValue(value)).toBe(123)
        expect(toNumberValue(value1)).toBe(1)
        expect(toNumberValue(value2)).toBe(0)
    })

    it('should validate metadata object', () => {
        expect(validateConf(metadata)).toBe(undefined)
        expect(validateConf({ ...metadata, name: '' })).toBe(true)
        expect(validateConf({ ...metadata, symbol: '' })).toBe(true)
        expect(validateConf({ ...metadata, description: '' })).toBe(true)
        expect(validateConf({ ...metadata, seller_fee_basis_points: 0 })).toBe(true)
        expect(validateConf({ ...metadata, collection: { ...metadata.collection, name: '' } })).toBe(true)
        expect(validateConf({ ...metadata, collection: { ...metadata.collection, family: '' } })).toBe(true)
        expect(validateConf({ ...metadata, properties: { ...metadata.properties, category: '' } })).toBe(true)
        expect(validateConf({ ...metadata, properties: { ...metadata.properties, creators: [] } })).toBe(true)
        expect(validateConf({ ...metadata, properties: { ...metadata.properties, creators: [{ address: '', share: 100 }] } })).toBe(true)
        expect(validateConf({ ...metadata, properties: { ...metadata.properties, creators: [{ address: 'asdfasdfasdfsadf', share: 0 }] } })).toBe(true)
        let object = { 
            ...metadata,
            properties: {
                ...metadata.properties,
                creators: [
                    { address: 'asdfasdfasdfsadf', share: 0 },
                    { address: 'asdfasdfasdfsadf', share: 100 }
                ]
            }
        }
        expect(validateConf(object)).toBe(true)
        object = { 
            ...metadata,
            properties: {
                ...metadata.properties,
                creators: [
                    { address: 'asdfasdfasdfsadf', share: 50 },
                    { address: 'asdfasdfasdfsadf', share: 50 }
                ]
            }
        }
        expect(validateConf(object)).toBe(undefined)

    })

    it('should validate algoritm configuration', () => {
        expect(validateConf(algConf)).toBe(undefined)
        expect(validateConf({ ...algConf, images_count: 0 })).toBe(true)
        expect(validateConf({ ...algConf, time_limit: false })).toBe(undefined)
        expect(validateConf({ ...algConf, sequences_is_unique: false })).toBe(undefined)
        expect(validateConf({ ...algConf, backgroud_color_rgba: '' })).toBe(true)
        expect(validateConf({ ...algConf, backgroud_color_rgba: '0' })).toBe(true)
        expect(validateConf({ ...algConf, backgroud_color_rgba: '0, 0, 0' })).toBe(true)
        expect(validateConf({ ...algConf, backgroud_color_rgba: '0, 0, 0, 255' })).toBe(undefined)
        expect(validateConf({ ...algConf, backgroud_color_rgba: '0, dkdkd, 0, 255' })).toBe(true)
        expect(validateConf({ ...algConf, size: { height: 0, width: 616 } })).toBe(true)
        expect(validateConf({ ...algConf, size: { height: 1416, width: 0 } })).toBe(true)
    })
})