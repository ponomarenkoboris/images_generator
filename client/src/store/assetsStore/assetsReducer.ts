import assetsTypes from "./assetsTypes"
import { 
    FolderState, 
    AssetsActionCreator, 
    UpdatedFolder, 
    UpdateAssetsType, 
    AssetToDelete, 
    UpdateAssetNamePaylaod 
} from "./types"

const initialState = [] as FolderState[]

const assetsReducer = (state = initialState, action: AssetsActionCreator<unknown>) => {
    switch (action.type) {
        case assetsTypes.ADD_FOLDER:
            return [ ...state, { id: state.length + 1, folderName: 'Default name', assets: [] }]

        case assetsTypes.DELETE_FOLDER:
            return [...state.filter(folder => folder.id !== action.payload)]

        case assetsTypes.UPDATE_FOLDER:
            const updatedFolder = action.payload as UpdatedFolder
            return state.map(folder => folder.id === updatedFolder.id ? { ...folder, ...updatedFolder} : folder)

        case assetsTypes.UPDATE_ASSETS:
            const { folderId, assets } = action.payload as UpdateAssetsType
            const folders = state.map((folder, idx) => {
                if (folder.id === folderId) {
                    folder.assets = [...state[idx].assets, ...assets]
                }
                return folder
            })
            return folders

        case assetsTypes.DELETE_ASSET:
            const { folderId: id, assetId } = action.payload as AssetToDelete
            return state.map(folder => {
                if (folder.id === id) {
                    folder.assets = folder.assets.filter(asset => asset.id !== assetId)
                }
                return folder
            })

        case assetsTypes.UPDATE_ASSET_NAME:
            const { folderId: idFolder, assetId: idAsset, name } = action.payload as UpdateAssetNamePaylaod
            return state.map(folder => {
                if (folder.id === idFolder) {
                    folder.assets = folder.assets.map(asset => {
                        if (asset.id === idAsset) asset.name = name
                        return asset
                    })
                }
                return folder
            })

        case assetsTypes.DOWNLOAD_SLICES: 
            return action.payload as FolderState[]
        default:
            return state
    }
}

export default assetsReducer