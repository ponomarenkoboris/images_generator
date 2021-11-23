import actionTypes from "./walletTypes";
import { WalletActionCreator } from "./types";

export const updateWalletBalance = (payload: number): WalletActionCreator => ({ type: actionTypes.UPDATE_BALANCE, payload })