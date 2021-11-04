import { useEffect, useState, useReducer, useContext } from 'react'
import * as anchor from '@project-serum/anchor'
import { awaitTransactionSignatureConfirmation, getCandyMachineState, mintOneToken } from '../../utils/solana-utils'
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button, CircularProgress } from '@material-ui/core'
import { CountDown } from './CountDown'
import { mintReduser } from './helpers/mintReducer'
import { refreshCandyMachineState, changeMintingStatus, changeSoldOutStatus, settingBalanceValue } from './helpers/actionCreators'
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

type AlertState = {
    open: boolean
    message: string
    severity: 'success' | 'info' | 'warning' | 'error' | undefined
}

const Mint = ({ candyMachineId, config, connection, startDate, treasury, txTimeout }: MintProps) => {

    const { contextWallet, setContextWallet } = useContext(WalletContext)

    const initialState = {
        balance: contextWallet.balance,
        dateStart: new Date(startDate),
        isSoldOut: false,
        itemsRemaining: 0,
        candyMachine: null,
        isMinting: false
    }
    const [ state, dispatch ] = useReducer(mintReduser, initialState)

    const [isActive, setIsActive] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [alertState, setAlertState] = useState<AlertState>({ open: false, message: '', severity: undefined })

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
            if (wallet && state.candyMachine?.program) {
                const mintTxId = await mintOneToken( state.candyMachine, config, wallet.publicKey, treasury)

                const status = await awaitTransactionSignatureConfirmation(mintTxId, txTimeout, connection, 'singleGossip', false)

                if (!status?.err) {
                    setAlertState({ open: true, message: 'Congratulations! Mint succeeded!', severity: 'success' })
                } else {
                    setAlertState({ open: true, message: 'Mint failed! Please try again!', severity: 'error' })
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

            setAlertState({ open: true, message, severity: 'error' })
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
                            <p>Your balance - {state.balance} SOL</p>
                            {state.isSoldOut ? <p className="sold-info">Sold Out!</p> : <p>Images remaining - {state.itemsRemaining}</p>}
                        </>
                    ) : (
                        <p>Generate a unique image</p>
                    )}
                </div>
                {wallet ? 
                    state.isSoldOut ? null : (
                        <Button 
                            variant='outlined'
                            color='primary'
                            disabled={state.isMinting || !isActive}
                            onClick={mintToken}
                        >
                            {isActive ? (
                                state.isMinting ? (
                                    <CircularProgress />
                                ) : (
                                    'Mint Token'
                                )
                            ) : (
                                <CountDown
                                    date={state.dateStart}
                                    onMount={({ completed }) =>
                                        completed && setIsActive(true)
                                    }
                                    onComplete={() => setIsActive(true)}
                                />
                            )}
                        </Button>
                    )
                : (
                    <WalletDialogButton color='primary' />
                )}
            </div>
        </>
    )
}

export default Mint