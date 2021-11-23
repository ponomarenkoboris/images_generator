import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFolder, deleteFolder, updateFolder, uploadAssets } from '../../../store/assetsStore/assetsActionCreators'
import { UpdatedFolder } from '../../../store/assetsStore/types'
import { 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Button, 
    IconButton, 
    TextField, 
    CircularProgress  
} from "@material-ui/core"
import { UploadAsset } from './uploadAsset/UploadAsset'
import { convertAssets, generateAssets, RequestConfig, generatorAvaliable } from '../helpers/utils'
import { AssetView } from './assetView/AssetView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import ClearIcon from '@material-ui/icons/Clear'
import './AssetsSlices.scss'

type FolderToUpdate = UpdatedFolder & { isChanging?: boolean }

export const AssetsSlices = () => {
    const requestConfig = useSelector((state: RequestConfig): RequestConfig => 
        ({ metadata: state.metadata, outputConf: state.outputConf, assetsSlices: state.assetsSlices }));
    const dispatch = useDispatch()
    const [folderToUpdate, setFolderToUpdate] = useState({} as FolderToUpdate)
    const [isDisabled, setIsDisabled] = useState(false)
    const [isGenerates, setIsGenerates] = useState(false)
    
    useEffect(() => { setIsDisabled(generatorAvaliable(requestConfig)) }, [requestConfig])

    const saveFolderChanges = () => {
        if (Object.entries(folderToUpdate).length !== 0) {
            delete folderToUpdate.isChanging
            dispatch(updateFolder(folderToUpdate))
        }
        setFolderToUpdate({} as FolderToUpdate)
    }

    const createAssets = async () => {
        setIsGenerates(true)
        try {
            await generateAssets(requestConfig)
            setIsGenerates(false)
        } catch (error) {
            setIsGenerates(false)
        }
    }

    const updateAssetsList = async (folderId: number, fileList: FileList) => {
        const assetsFiles: File[] = []
        for (let i = 0; i < fileList.length; i++) {
            assetsFiles.push(fileList[i])
        }
        const assets = await convertAssets(assetsFiles)
        dispatch(uploadAssets({ folderId, assets }))
    }

    return (
        <div className='assets__slices'>
            <div className='assets'>
                <div className='assets__header'>
                    <h2>Папки с исходными материалами</h2>
                    <Button
                        className='append__bottom'
                        onClick={() => dispatch(addFolder())}
                        variant='outlined'
                    >
                        Добавить папку
                    </Button>
                </div>
                {requestConfig.assetsSlices.map(({ id, folderName, assets }) => (
                    <div key={id} className='folder__wrapper'>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                {folderToUpdate.isChanging && folderToUpdate.id === id ? (
                                    <TextField 
                                        variant='outlined'
                                        value={folderToUpdate.folderName ? folderToUpdate.folderName : folderName}
                                        onChange={e => setFolderToUpdate(prevState => ({ ...prevState, folderName: e.target.value }))}
                                        onClick={e => e.stopPropagation()}
                                    />
                                ) : folderName}
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='assets__list'>
                                    {assets.map((asset) => <AssetView key={asset.id} {...asset} folderId={id}/>)}
                                    <UploadAsset folderId={id} imagesDropped={updateAssetsList} />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className='folder__actions'>
                            {folderToUpdate.isChanging && folderToUpdate.id === id ? (
                                <>
                                    <IconButton
                                        onClick={() => saveFolderChanges()}
                                    >
                                        <SaveAltIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setFolderToUpdate({} as FolderToUpdate)}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton
                                        onClick={() => setFolderToUpdate(prevState => ({ ...prevState, isChanging: true, id }))}
                                    >
                                        <CreateIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => dispatch(deleteFolder(id))}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className='assets__actions'>
                <Button
                    variant='outlined'
                    className='generate__button'
                    disabled={isDisabled}
                    onClick={createAssets}
                >   
                    {isGenerates ? <CircularProgress /> : 'Сгенерировать коллекцию'}
                </Button>
            </div>
        </div>
    )
}