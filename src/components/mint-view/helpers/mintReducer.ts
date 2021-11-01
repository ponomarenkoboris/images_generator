import { CandyMachine } from '../../../utils/solana-utils'

export const actionType = {
    REFRESH_CANDY_MACHINE_STATE: 'REFRESH_CANDY_MACHINE_STATE',
    SET_IS_SOLD_OUT: 'SET_IS_SOLD_OUT',
    SET_BALANCE: 'SET_BALANCE',
    SET_IS_MINTING: 'SET_IS_MINTING'
}

export type State = {
    dateStart: Date
    balance: number | null
    isSoldOut: boolean
    itemsRemaining: number
    candyMachine: CandyMachine | null
    isMinting: boolean
}

type ActionCreator = {
    type: string
    payload: any
}

export const mintReduser = (state: State, action: ActionCreator): State => {
    switch(action.type) {
        case actionType.REFRESH_CANDY_MACHINE_STATE:
            return {
                ...state,
                itemsRemaining: action.payload.itemsRemaining,
                isSoldOut: action.payload.isSoldOut,
                dateStart: action.payload.dateStart,
                candyMachine: action.payload.candyMachine
            }
        case actionType.SET_IS_SOLD_OUT:
            return {
                ...state,
                isSoldOut: action.payload.isSoldOut
            }
        case actionType.SET_BALANCE:
            return {
                ...state,
                balance: action.payload.setBalance
            }
        case actionType.SET_IS_MINTING:
            return {
                ...state,
                isMinting: action.payload.setIsMinting
            }
        default:
            return state
    }
}