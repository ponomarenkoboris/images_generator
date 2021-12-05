import algTypes from './algorithmTypes'
import { OutputImageConf, AlgoActionCreator, SizeValue } from './types'

const initialState: OutputImageConf = {
    images_count: 1,
    size: {
        height: 672,
        width: 1416
    },
    time_limit: false,
    sequences_is_unique: false,
    backgroud_color_rgba: '0, 0, 0, 255'
}

const formStringToBoolean = (val: string) => {
    if (val === 'true') return true
    if (val === 'false') return false
    return 'null'
}

const algorithmReducer = (state = initialState, action: AlgoActionCreator<unknown>): OutputImageConf => {
    switch (action.type) {
        case algTypes.UPDATE_IMAGES_COUNT: {
            return {
                ...state,
                images_count: action.payload as number
            }
        }

        case algTypes.UPDATE_IMAGE_SIZE: {
            const { isHeight, newValue } = action.payload as SizeValue
            const stateCopy = Object.assign({}, state)
            stateCopy.size[isHeight ? 'height' : 'width'] = newValue
            return stateCopy
        }

        case algTypes.UPDATE_TIMEOUT:
            const time_limit = action.payload  as boolean | number
            return { ...state, time_limit }

        case algTypes.UPDATE_SEQUENCES_UNIQUE:
            const sequences_is_unique = formStringToBoolean(action.payload as string)
            return sequences_is_unique !== 'null' ? { ...state, sequences_is_unique } : state
        
        case algTypes.UPDATE_BACKGROUND_COLOR:
            return {
                ...state,
                backgroud_color_rgba: action.payload as string
            }

        case algTypes.UPLOAD_CONF:
            return {
                ...action.payload as OutputImageConf
            }

        default:
            return state
    }
}

export default algorithmReducer