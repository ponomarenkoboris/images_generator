export type FolderState = {
    id: number
    folderName: string
    assets: Asset[]
}

export type UpdateAssetNamePaylaod = { folderId: number, assetId: number, name: string }

export type Asset = { name: string, url: string, id: number }

export type UpdatedFolder = { id: number } & Partial<FolderState>

export type UpdateAssetsType = { folderId: number, assets: Asset[] }

export type AssetToDelete = { folderId: number, assetId: number }

export type AssetsActionCreator<T = number> = {
    type: string
    payload?: T
}