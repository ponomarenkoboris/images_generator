import { ActionCreator, UpdateMachineConfigProps } from './types'
import actionTypes from './candyTypes'

const initialState = {
    treasury: '',
    config: '',
    candyMachineId: '',
    network: '',
    connection: '',
    startDateSeed: '',   
}

const candyReducer = (state = initialState, action: ActionCreator) => {
    switch (action.type)  {
        case actionTypes.UPDATE_CANDY_CONFIG:
            return { ...state, ...action.payload }

        case actionTypes.RESET_CANDY_CONFIG:
            const stateCopy: UpdateMachineConfigProps = Object.assign({}, state)
            for (let key in stateCopy) {
                stateCopy[key] = ''
            }

            return { ...stateCopy }
            
        default:
            return state
    }
}

export default candyReducer