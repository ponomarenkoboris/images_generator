import assetsTypes from "./assetsTypes"
import { 
    AssetsActionCreator,
    UpdatedFolder, 
    UpdateAssetsType, 
    AssetToDelete, 
    UpdateAssetNamePaylaod, 
    FolderState
} from "./types"

export const addFolder = (): AssetsActionCreator => ({ type: assetsTypes.ADD_FOLDER })
export const deleteFolder = (id: number): AssetsActionCreator => ({ type: assetsTypes.DELETE_FOLDER, payload: id })
export const updateFolder = (payload: UpdatedFolder): AssetsActionCreator<UpdatedFolder> => ({ type: assetsTypes.UPDATE_FOLDER, payload })
export const downloadSlices = (payload: FolderState[]): AssetsActionCreator<FolderState[]> => ({ type: assetsTypes.DOWNLOAD_SLICES, payload })

export const uploadAssets = (payload: UpdateAssetsType): AssetsActionCreator<UpdateAssetsType> => ({ type: assetsTypes.UPDATE_ASSETS, payload })
export const deleteAsset = (payload: AssetToDelete): AssetsActionCreator<AssetToDelete> => ({ type: assetsTypes.DELETE_ASSET, payload })
export const updateAsset = (payload: { folderId: number, assetId: number, name: string }): AssetsActionCreator<UpdateAssetNamePaylaod> => ({ type: assetsTypes.UPDATE_ASSET_NAME, payload })