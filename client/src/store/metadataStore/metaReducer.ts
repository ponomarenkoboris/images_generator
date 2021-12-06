import actionTypes from "./metaActionTypes"
import { TokenMetadata, Creator, MetadataActionCreator, Category, CreatorsUpdateType } from "./types"

const initialState: TokenMetadata = {
    name: '',
    symbol: '',
    description: '',
    seller_fee_basis_points: 0,
    collection: {
        name: '',
        family: ''
    },
    properties: {
        category: '',
        creators: [] as Creator[]
    }
}

const metaReducer = (state = initialState, action: MetadataActionCreator<unknown>): TokenMetadata => {
    switch (action.type) {
        case actionTypes.UPDATE_META_NAME:
            return {
                ...state,
                name: action.payload as string
            }
        case actionTypes.UPDATE_META_SYMBOL: 
            return {
                ...state, 
                symbol: action.payload as string
            }

        case actionTypes.UPDATE_META_DESCRIPTION:
            return {
                ...state,
                description: action.payload as string
            }
        case actionTypes.UPDATE_META_SELLER:
            return {
                ...state,
                seller_fee_basis_points: action.payload as number
            }

        case actionTypes.UPDATE_META_COLLECTION_NAME:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    name: action.payload as string
                }
            }
        case actionTypes.UPDATE_META_COLLECTION_FAMILY:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    family: action.payload as string
                }
            }

        case actionTypes.UPDATE_META_PROPERTIES_CATEGORY:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    category: action.payload as Category
                }
            }

        case actionTypes.UPDATE_META_PROPERTIES_CREATORS:
            const { isAddress, creatorId, newValue } = action.payload as CreatorsUpdateType
            const updatedCreators = state.properties.creators.map(creator => 
                creator.id === creatorId ? isAddress ? { ...creator, address: newValue } : { ...creator, share: newValue } : creator
            )

            return {
                ...state,
                properties: {
                    ...state.properties,
                    creators: updatedCreators as Creator[]
                }
            }

        case actionTypes.REMOVE_META_PROPERTIES_CREATORS:
            const creators = state.properties.creators.filter(creator => creator.id !== action.payload)
            return {
                ...state,
                properties: {
                    ...state.properties,
                    creators
                }
            }

        case actionTypes.ADD_META_PROPERTIES_CREATORS:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    creators: [ ...state.properties.creators, action.payload as Creator ]
                }
            }
        case actionTypes.UPLOAD_META:
            const metadata = action.payload as TokenMetadata
            metadata.properties.creators.forEach((creator, idx) => { creator.id = idx + 1})
            return { ...metadata }
        
        default:
            return state
    }
}

export default metaReducer