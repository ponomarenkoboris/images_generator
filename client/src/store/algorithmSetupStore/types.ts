export type OutputImageConf = {
    images_count: number
    time_limit: boolean | number
    sequences_is_unique: boolean
    backgroud_color_rgba: string
    size: {
        height: number
        width: number
    }
}

export type SizeValue = { isHeight: boolean, newValue: number }

export type AlgoActionCreator<T = number> = {
    type: string
    payload: T
}