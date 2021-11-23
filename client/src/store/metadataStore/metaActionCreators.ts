import { Creator, MetadataActionCreator, TokenMetadata, CreatorsUpdateType } from './types'
import actionTypes from './metaActionTypes'

export const changeName = (name: string): MetadataActionCreator => ({ type: actionTypes.UPDATE_META_NAME, payload: name })
export const changeDescription = (description: string): MetadataActionCreator => ({ type: actionTypes.UPDATE_META_DESCRIPTION, payload: description })
export const changeSymbol = (symbol: string): MetadataActionCreator =>  ({ type: actionTypes.UPDATE_META_SYMBOL, payload: symbol })
export const changeSeller = (seller: number): MetadataActionCreator<number> =>  ({ type: actionTypes.UPDATE_META_SELLER, payload: seller })

export const changeCollectionName = (collectionName: string): MetadataActionCreator =>  ({ type: actionTypes.UPDATE_META_COLLECTION_NAME, payload: collectionName })
export const changeCollectionFamily = (collectionFamily: string): MetadataActionCreator =>  ({ type: actionTypes.UPDATE_META_COLLECTION_FAMILY, payload: collectionFamily })

export const changePropertyCategory = (category: string): MetadataActionCreator => ({ type: actionTypes.UPDATE_META_PROPERTIES_CATEGORY, payload: category })
export const changePropertyCreators = (creatorId: number, isAddress: boolean, newValue: string | number): MetadataActionCreator<CreatorsUpdateType> => (
    { type: actionTypes.UPDATE_META_PROPERTIES_CREATORS, payload: { isAddress, newValue, creatorId } }
)
export const removeCreator = (id: number): MetadataActionCreator<number> => ({ type: actionTypes.REMOVE_META_PROPERTIES_CREATORS, payload: id })
export const addCreator = (payload: Creator): MetadataActionCreator<Creator> => ({ type: actionTypes.ADD_META_PROPERTIES_CREATORS, payload })

export const uploadMeta = (payload: TokenMetadata): MetadataActionCreator<TokenMetadata> => ({ type: actionTypes.UPLOAD_META, payload })