import { useEffect, useReducer, useContext } from 'react'
import * as anchor from '@project-serum/anchor'
import { awaitTransactionSignatureConfirmation, getCandyMachineState, mintOneToken } from '../../utils/solana-utils'
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button, CircularProgress, Snackbar } from '@material-ui/core'
import Alert from "@material-ui/lab/Alert"
import { CountDown } from './CountDown'
import { mintReduser } from './helpers/mintReducer'
import { 
    refreshCandyMachineState, 
    changeMintingStatus, 
    changeSoldOutStatus, 
    settingBalanceValue,
    updateAlertState,
    updateIsActive,
    TAlertState
} from './helpers/actionCreators'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import './Mint.scss'
import { WalletContext } from '../../context/WalletContext'

type MintProps = {
    candyMachineId: anchor.web3.PublicKey
    config: anchor.web3.PublicKey
    connection: anchor.web3.Connection
    startDate: number
    treasury: anchor.web3.PublicKey
    txTimeout: number
}

const Mint = ({ candyMachineId, config, connection, startDate, treasury, txTimeout }: MintProps) => {

    const { contextWallet, setContextWallet } = useContext(WalletContext)

    const initialState = {
        balance: contextWallet.balance,
        dateStart: new Date(startDate),
        isSoldOut: false,
        itemsRemaining: 0,
        candyMachine: null,
        isMinting: false,
        isActive: false,
        alertState: {
            open: false,
            message: '',
            severity: undefined
        }
    }

    const [ state, dispatch ] = useReducer(mintReduser, initialState)
    const { candyMachine, isMinting, isSoldOut, itemsRemaining, balance, dateStart, alertState, isActive } = state

    const wallet = useAnchorWallet()

    const updateCandyMachineState = () => {

        (async () => {
            if (!wallet) return

            try {
                const { candyMachine, goLiveDate, itemsRemaining } = await getCandyMachineState(wallet as anchor.Wallet, candyMachineId, connection)
                dispatch(refreshCandyMachineState({
                    itemsRemaining: itemsRemaining,
                    isSoldOut: itemsRemaining === 0,
                    dateStart: goLiveDate,
                    candyMachine: candyMachine
                }))

            } catch (error) {
                console.error(error)
            }
        })()
    }

    const mintToken = async (): Promise<void> => {
        try {
            dispatch(changeMintingStatus(true))
            if (wallet && candyMachine?.program) {
                const mintTxId = await mintOneToken( candyMachine, config, wallet.publicKey, treasury)

                const status = await awaitTransactionSignatureConfirmation(mintTxId, txTimeout, connection, 'singleGossip', false)

                if (!status?.err) {
                    const payload: TAlertState = { open: true, message: 'Congratulations! Mint succeeded!', severity: 'success' }
                    dispatch(updateAlertState(payload))
                } else {
                    const payload: TAlertState = { open: true, message: 'Mint failed! Please try again!', severity: 'error' }
                    dispatch(updateAlertState(payload))
                }
            }
        } catch (error: any) {
            let message = error.msg || 'Minting failed! Please try again!Minting failed! Please try again!'

            if (!error.msg) {
                if (error.message.indexOf('0x138')) {
                } else if (error.message.indexOf('0x137')) {
                    message = 'SOLD OUT!'
                } else if (error.message.indexOf('0x135')) {
                    message = 'Insufficient funds to mint. Please fund your wallet.'
                }
            } else {
                if (error.code === 311) {
                    message = 'SOLD OUT!'
                    dispatch(changeSoldOutStatus(true))
                    dispatch(changeMintingStatus(false))
                } else if (error.code === 312) {
                    message = 'Minting period hasn`t started yet.'
                }
            }
            const payload: TAlertState = { open: true, message, severity: 'error' }
            dispatch(updateAlertState(payload))
        } finally {
            if (wallet) {
                const balance = await connection.getBalance(wallet.publicKey)
                const solBalance = balance / LAMPORTS_PER_SOL
                dispatch(settingBalanceValue(solBalance))
                setContextWallet(prevWallet => ({ ...prevWallet, balance: solBalance }))
            }
            dispatch(changeMintingStatus(false))
            updateCandyMachineState()
        }
    }

    useEffect(() => {
        (async () => {
            if (wallet) {
                const balance = await connection.getBalance(wallet.publicKey)
                const solBalance = balance / LAMPORTS_PER_SOL
                dispatch(settingBalanceValue(solBalance))
                setContextWallet(prevWallet => ({ ...prevWallet, balance: solBalance }))
            }
        })()
    }, [wallet, connection, setContextWallet])

    useEffect(updateCandyMachineState, [wallet, candyMachineId, connection])

    return (
        <>
            <div className="mint-container">
                <div className={wallet ? 'wallet-info' : 'description'}>
                    {wallet ? (
                        <>
                            <p>Your balance - {balance} SOL</p>
                            {isSoldOut ? <p className="sold-info">Sold Out!</p> : <p>Images remaining - {itemsRemaining}</p>}
                        </>
                    ) : (
                        <p>Generate a unique image</p>
                    )}
                </div>
                {wallet ? 
                    isSoldOut ? null : (
                        <Button 
                            variant='outlined'
                            color='primary'
                            disabled={isMinting || !isActive}
                            onClick={mintToken}
                        >
                            {isActive ? (
                                isMinting ? (
                                    <CircularProgress />
                                ) : (
                                    'Mint Token'
                                )
                            ) : (
                                <CountDown
                                    date={dateStart}
                                    onMount={({ completed }) =>
                                        completed && dispatch(updateIsActive(true))
                                    }
                                    onComplete={() => dispatch(updateIsActive(true))}
                                />
                            )}
                        </Button>
                    )
                : (
                    <WalletDialogButton color='primary' />
                )}
                <Snackbar
                    open={alertState.open}
                    autoHideDuration={6000}
                    onClose={() => dispatch(updateAlertState({ open: false, message: '', severity: undefined }))}
                >
                    <Alert
                        onClose={() => dispatch(updateAlertState({ open: false, message: '', severity: undefined }))}
                        severity={alertState.severity}
                    >{alertState.message}</Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default Mint