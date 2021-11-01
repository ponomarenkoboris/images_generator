import { useEffect, useState, useReducer, useContext } from 'react'
import * as anchor from '@project-serum/anchor'
import { awaitTransactionSignatureConfirmation, getCandyMachineState, mintOneToken } from '../../utils/solana-utils'
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button, CircularProgress } from '@material-ui/core'
import { CountDown } from './CountDown'
import { actionType, mintReduser } from './helpers/mintReducer'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import './Mint.scss'

import { WalletContext } from '../../context/WalletContext'

// TODO debug (balance and remaining NFT should not update every time when path is changing)

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
    const { balance: contextBalance } = useContext(WalletContext)

    const initialState = {
        balance: contextBalance || null,
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

    const refreshCandyMachineState = () => {

        (async () => {
            if (!wallet) return

            try {
                const { candyMachine, goLiveDate, itemsRemaining } = await getCandyMachineState(wallet as anchor.Wallet, candyMachineId, connection)

                dispatch({ type: actionType.REFRESH_CANDY_MACHINE_STATE, payload: {
                    itemsRemaining: itemsRemaining,
                    isSoldOut: itemsRemaining === 0,
                    dateStart: goLiveDate,
                    candyMachine: candyMachine
                }})

            } catch (error) {
                console.error(error)
            }
        })()
    }

    const mintToken = async (): Promise<void> => {
        try {
            dispatch({ type: actionType.SET_IS_MINTING, payload: { isMinting: true } })
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
                    dispatch({ type: actionType.SET_IS_SOLD_OUT, payload: { isSoldOut: true } })
                } else if (error.code === 312) {
                    message = 'Minting period hasn`t started yet.'
                }
            }

            setAlertState({ open: true, message, severity: 'error' })
        } finally {
            if (wallet) {
                const balance = await connection.getBalance(wallet.publicKey)
                const solBalance = balance / LAMPORTS_PER_SOL
                dispatch({ type: actionType.SET_BALANCE, payload: { setBalance: solBalance } })
            }
            dispatch({ type: actionType.SET_IS_MINTING, payload: { isMinting: false } })
            refreshCandyMachineState()
        }
    }

    useEffect(() => {
        (async () => {
            if (wallet) {
                const balance = await connection.getBalance(wallet.publicKey)
                const solBalance = balance / LAMPORTS_PER_SOL
                dispatch({ type: actionType.SET_BALANCE, payload: { setBalance: solBalance } })
            }
        })()
    }, [wallet, connection])

    useEffect(refreshCandyMachineState, [wallet, candyMachineId, connection])

    return (
        <>
            <div className="mint-container">
                <div className={wallet ? 'wallet-info' : 'description'}>
                    {wallet ? (
                        <>
                            <p>Your balance - {state.balance} SOL</p>
                            <p>Images remaining - {state.itemsRemaining}</p>
                        </>
                    ) : (
                        <p>Generate a unique image</p>
                    )}
                </div>
                {wallet ? (
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={state.isSoldOut || state.isMinting || !isActive}
                        onClick={mintToken}
                    >
                        {state.isSoldOut ? (
                            'Sold Out'
                        ) : isActive ? (
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
                ) : (
                    <WalletDialogButton variant="outlined"/>
                )}
            </div>
        </>
    )
}

export default Mint