type Collection = { name: string, family: string }
export type Creator = { address: string, share: number, id?: number }

export type Category = 'image' | 'audio' | 'vr' | 'html' | ''

type Properties = {
    category: Category,
    creators: Creator[]
}

export type CreatorsUpdateType = { isAddress: boolean, newValue: string | number, creatorId: number }

export type MetadataActionCreator<T = string> = {
    type: string,
    payload: T
}

export type TokenMetadata = {
    name: string
    symbol: string
    description: string
    seller_fee_basis_points: number
    collection: Collection
    properties: Properties
}