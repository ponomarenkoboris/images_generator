import { CandyMachine } from '../../../utils/solana-utils'
import { actionsType } from './actions'
import { ActionCreator } from './actionCreators'
import { TRefreshingPayload } from './actionCreators'

export type State = {
    dateStart: Date
    balance: number | null
    isSoldOut: boolean
    itemsRemaining: number
    candyMachine: CandyMachine | null
    isMinting: boolean
}

export const mintReduser = (state: State, action: ActionCreator): State => {
    switch(action.type) {
        case actionsType.REFRESH_CANDY_MACHINE_STATE:
            const { itemsRemaining, isSoldOut, dateStart, candyMachine } = action.payload as TRefreshingPayload
            return {
                ...state,
                itemsRemaining: itemsRemaining,
                isSoldOut: isSoldOut,
                dateStart: dateStart,
                candyMachine: candyMachine
            }
        case actionsType.SET_IS_SOLD_OUT:
            return {
                ...state,
                isSoldOut: action.payload as boolean
            }
        case actionsType.SET_BALANCE:
            return {
                ...state,
                balance: action.payload as number
            }
        case actionsType.SET_IS_MINTING:
            return {
                ...state,
                isMinting: action.payload as boolean
            }
        default:
            return state
    }
}