export type TContentItem = { [key: string]: string }

export type TConfig = {
    images_count: number
    size: {
        width: number,
        height: number
    },
    backGroundColor: [number, number, number, number]
}

type TMetadataProperties = {
    files: { uri: string, type: string }[]
    category: 'image' | 'video' | 'audio' | 'vr' | 'html'
    creators: { address: string, share: number }
}

export type TMetadata = {
    name: string
    description: string
    symbol: string
    seller_fee_basis_points: number
    image: string
    attributes: { trait_type: string, value: string }[]
    collection: { name: string, family: string }
    properties: TMetadataProperties
}