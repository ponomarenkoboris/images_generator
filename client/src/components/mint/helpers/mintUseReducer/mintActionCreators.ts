import { actionsType } from "./mintActionTypes";
import { CandyMachine } from '../solanaUtils/solanaUtils'

export type RefreshingPayload = {
    itemsRemaining: number
    isSoldOut: boolean
    dateStart: Date
    candyMachine: CandyMachine
}

export type AlertState = {
    open: boolean
    message: string
    severity: 'success' | 'info' | 'warning' | 'error' | undefined
}

export type ActionCreator = {
    type: string
    payload: RefreshingPayload | AlertState | boolean | number
}

export const refreshCandyMachineState = (payload: RefreshingPayload): ActionCreator => ({ type: actionsType.REFRESH_CANDY_MACHINE_STATE, payload })
export const changeMintingStatus = (payload: boolean): ActionCreator => ({ type: actionsType.SET_IS_MINTING, payload })
export const changeSoldOutStatus = (payload: boolean): ActionCreator => ({ type: actionsType.SET_IS_SOLD_OUT, payload })
export const settingBalanceValue = (payload: number): ActionCreator => ({ type: actionsType.SET_BALANCE, payload })
export const updateAlertState = (payload: AlertState): ActionCreator => ({ type: actionsType.UPDATE_ALERT_STATE, payload })
export const updateIsActive = (payload: boolean): ActionCreator => ({ type: actionsType.UPDATE_IS_ACTIVE, payload })