import actionTypes from "./candyTypes"
import { UpdateMachineConfigProps, ActionCreator } from './types'

export const updateCandyConfig = (payload: UpdateMachineConfigProps): ActionCreator => ({ type: actionTypes.UPDATE_CANDY_CONFIG, payload })
export const resetCandyConfig = (): ActionCreator => ({ type: actionTypes.RESET_CANDY_CONFIG })