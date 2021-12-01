import { MetadataSetup } from "./metadataSetup/MetadataSetup"
import { AlgorithmSetup } from "./algorithSetup/AlgorithmSetup"
import { AssetsSlices } from "./assetsSlices/AssetsSlices"
import { Button } from "@material-ui/core"
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { uploadConf } from "../store/algorithmSetupStore/algorithmActionCreators";
import { uploadMeta } from "../store/metadataStore/metaActionCreators";
import { downloadSlices } from '../store/assetsStore/assetsActionCreators'
import { useDispatch } from "react-redux";
import { RequestConfig } from './helpers/utils'
import request, { endpoints } from '../http-conf/request'
import './CreateCollectables.scss'


const CreateCollectables = () => {
    const dispatch = useDispatch()

    const downloadSetup = async () => {
        try {
            const response = await request.get(endpoints.getSetup)
            if (response.data) {
                const { metadata, outputConf, assetsSlices } = response.data as RequestConfig
                if (outputConf) dispatch(uploadConf(outputConf))
                if (metadata) dispatch(uploadMeta(metadata))
                if (assetsSlices) dispatch(downloadSlices(assetsSlices))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='collectables__setup'>
            <div className='download__setup'>
                <Button
                    variant='outlined'
                    onClick={downloadSetup}
                >
                    <CloudDownloadIcon />
                    <p>Загрузить настройки с сервера</p>
                </Button>
            </div>
            <div className='root__configuration'>
                <MetadataSetup />
                <AlgorithmSetup />
            </div>
            <AssetsSlices />
        </div>
    )
}

export default CreateCollectables