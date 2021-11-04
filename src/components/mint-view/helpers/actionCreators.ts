import { actionsType } from './actions'
import { CandyMachine } from '../../../utils/solana-utils'

export type TRefreshingPayload = {
    itemsRemaining: number
    isSoldOut: boolean
    dateStart: Date
    candyMachine: CandyMachine
}

export type ActionCreator = {
    type: Uppercase<string>
    payload: TRefreshingPayload | boolean | number
}

export const refreshCandyMachineState = (payload: TRefreshingPayload): ActionCreator => ({ type: actionsType.REFRESH_CANDY_MACHINE_STATE, payload })
export const changeMintingStatus = (payload: boolean): ActionCreator => ({ type: actionsType.SET_IS_MINTING, payload })
export const changeSoldOutStatus = (payload: boolean): ActionCreator => ({ type: actionsType.SET_IS_SOLD_OUT, payload })
export const settingBalanceValue = (payload: number): ActionCreator => ({ type: actionsType.SET_BALANCE, payload })