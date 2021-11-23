import actionTypes from "./walletTypes";
import { WalletActionCreator, CryptoWallet } from "./types";

const initialState = {
    balance: null
}

const walletReducer = (state: CryptoWallet = initialState, action: WalletActionCreator) => {
    switch (action.type) {
        case actionTypes.UPDATE_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        default:
            return state
    }
}

export default walletReducer