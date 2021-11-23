import algTypes from "./algorithmTypes"
import { AlgoActionCreator, OutputImageConf, SizeValue } from './types'

export const updateImagesCount = (count: number): AlgoActionCreator => ({ type: algTypes.UPDATE_IMAGES_COUNT, payload: count })
export const updateSize = (isHeight: boolean, newValue: number): AlgoActionCreator<SizeValue> => ({ type: algTypes.UPDATE_IMAGE_SIZE, payload: { isHeight, newValue } }
)
export const updateTimeout = (timout: boolean | number): AlgoActionCreator<boolean | number> => ({ type: algTypes.UPDATE_TIMEOUT, payload: timout })

export const updateSequencesUnique = (isUnique: string): AlgoActionCreator<string> => ({ type: algTypes.UPDATE_SEQUENCES_UNIQUE, payload: isUnique })
export const updateBackgroundColor = (backgrondColor: string): AlgoActionCreator<string> => ({ type: algTypes.UPDATE_BACKGROUND_COLOR, payload: backgrondColor })

export const uploadConf = (payload: OutputImageConf): AlgoActionCreator<OutputImageConf> => ({ type: algTypes.UPLOAD_CONF, payload })