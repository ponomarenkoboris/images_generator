import { actionsType } from "./mintActionTypes";
import { AlertState, RefreshingPayload, ActionCreator } from "./mintActionCreators";
import { CandyMachine } from '../solanaUtils/solanaUtils'

export type MintState = {
    dateStart: Date
    balance: number | null
    isSoldOut: boolean
    itemsRemaining: number
    candyMachine: CandyMachine | null
    isMinting: boolean
    isActive: boolean
    alertState: AlertState
}

export const mintReduser = (state: MintState, action: ActionCreator) => {
    switch (action.type) {
        case actionsType.REFRESH_CANDY_MACHINE_STATE:
            const { itemsRemaining, isSoldOut, dateStart, candyMachine } = action.payload as RefreshingPayload
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
        case actionsType.UPDATE_ALERT_STATE:
            return {
                ...state,
                alertState: {
                    ...action.payload as AlertState
                }
            }
        case actionsType.UPDATE_IS_ACTIVE:
            return {
                ...state,
                isActive: action.payload as boolean
            }
        default:
            return state
    }
}