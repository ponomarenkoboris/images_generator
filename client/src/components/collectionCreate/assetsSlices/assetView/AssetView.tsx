import { useState, useEffect } from 'react'
import { IconButton, TextField } from "@material-ui/core"
import { useDispatch } from 'react-redux'
import { validateAssetName } from '../../helpers/utils'
import { deleteAsset, updateAsset } from '../../../../store/assetsStore/assetsActionCreators'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import SaveAltIcon from '@material-ui/icons/SaveAlt'

type AssetViewProps = {
    name: string
    url: string
    id: number
    folderId: number
}

export const AssetView = ({ name, url, id, folderId }: AssetViewProps) => {
    const [isChanging, setIsChanging] = useState(false)
    const [updatedName, setUpdatedName] = useState(name)
    const [nameIsCorrect, setNameIsCorrect] = useState(validateAssetName(updatedName))
    const dispatch = useDispatch()

    useEffect(() => { setNameIsCorrect(validateAssetName(updatedName)) }, [updatedName])

    const changeUpdates = () => {
        if (updatedName === name) return
        dispatch(updateAsset({ folderId, assetId: id, name: updatedName }))
        setIsChanging(false)
    }

    return (
        <div className='file__wrapper'>
            <img src={url} alt="Asset" />
            <div
                className='file__name' 
                style={{ color: !nameIsCorrect ? 'red' : 'initial' }}
            >
                {!isChanging ? updatedName : (
                    <TextField 
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                )}
                <span>{!nameIsCorrect && 'Пример названия файла: имя_файла#процент_выпадания.png'}</span>
            </div>
            <div className='file__actions'>
                {isChanging ? (
                    <>
                        <IconButton
                            onClick={changeUpdates}
                        >
                            <SaveAltIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton
                            onClick={() => setIsChanging(true)}
                        >
                            <CreateIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(deleteAsset({ folderId, assetId: id }))}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </div>
    )
}