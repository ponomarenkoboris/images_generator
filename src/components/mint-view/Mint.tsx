import { useEffect, useState, useContext } from 'react'
import * as anchor from '@project-serum/anchor'
import { awaitTransactionSignatureConfirmation, CandyMachine, getCandyMachineState, mintOneToken } from '../../utils/solana-utils'
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Button, CircularProgress } from '@material-ui/core'
import { CountDown } from './CountDown'
import { WalletContext } from '../../context/walletContext'
import './Mint.scss'

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

const Mint = ({
    candyMachineId,
    config,
    connection,
    startDate,
    treasury,
    txTimeout
}: MintProps) => {
    // TODO optimazation (create reducer function to change state, coplete context logic for saving wallet config)
    const { contextWallet, setContextWallet } = useContext(WalletContext)
    console.log('contextWallet.balance -> ', contextWallet?.balance)
    console.log('contextWallet.itemsRemaining -> ', contextWallet?.itemsRemaining)

    const [balance, setBalance] = useState<number>()
    const [isActive, setIsActive] = useState(false)
    const [isSoldOut, setIsSoldOut] = useState(false)
    const [isMinting, setIsMinting] = useState(false)
    // const [itemsAvailable, setItemsAvailable] = useState(0)
    // const [itemsRedeemed, setItemsRedeemed] = useState(0)
    const [itemsRemaining, setItemsRemaining] = useState(0)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        message: '',
        severity: undefined
    })

    const [dateStart, setDateStart] = useState(new Date(startDate))
    const wallet = useAnchorWallet()
    
    const [candyMachine, setCandyMachine] = useState<CandyMachine>()

    const refreshCandyMachineState = () => {
        (async () => {
            if (!wallet) return

            const {
                candyMachine,
                goLiveDate,
                // itemsAvailable,
                // itemsRedeemed,
                itemsRemaining
            } = await getCandyMachineState(
                wallet as anchor.Wallet,
                candyMachineId,
                connection
            )

            // setItemsAvailable(itemsAvailable)
            setItemsRemaining(itemsRemaining)
            // setItemsRedeemed(itemsRedeemed)
            setIsSoldOut(itemsRemaining === 0)
            setDateStart(goLiveDate)
            setCandyMachine(candyMachine)

            setContextWallet(prevWallet => ({ ...prevWallet, itemsRemaining }))
        })()
    }

    const mintToken = async (): Promise<void> => {
        try {
            setIsMinting(true)
            if (wallet && candyMachine?.program) {
                const mintTxId = await mintOneToken(
                    candyMachine,
                    config,
                    wallet.publicKey,
                    treasury
                )

                const status = await awaitTransactionSignatureConfirmation(
                    mintTxId,
                    txTimeout,
                    connection,
                    'singleGossip',
                    false
                )

                if (!status?.err) {
                    setAlertState({
                        open: true,
                        message: 'Congratulations! Mint succeeded!',
                        severity: 'success'
                    })
                } else {
                    setAlertState({
                        open: true,
                        message: 'Mint failed! Please try again!',
                        severity: 'error'
                    })
                }
            }
        } catch (error: any) {
            let message =
                error.msg ||
                'Minting failed! Please try again!Minting failed! Please try again!'
            if (!error.msg) {
                if (error.message.indexOf('0x138')) {
                } else if (error.message.indexOf('0x137')) {
                    message = 'SOLD OUT!'
                } else if (error.message.indexOf('0x135')) {
                    message =
                        'Insufficient funds to mint. Please fund your wallet.'
                }
            } else {
                if (error.code === 311) {
                    message = 'SOLD OUT!'
                    setIsSoldOut(true)
                } else if (error.code === 312) {
                    message = 'Minting period hasn`t started yet.'
                }
            }

            setAlertState({
                open: true,
                message,
                severity: 'error'
            })
        } finally {
            if (wallet) {
                const balance = await connection.getBalance(wallet.publicKey)
                const solBalance = balance / LAMPORTS_PER_SOL
                setBalance(solBalance)
                setContextWallet(prevWallet => ({ 
                    ...prevWallet, 
                    balance: solBalance
                }))
            }
            setIsMinting(false)
            refreshCandyMachineState()
        }
    }

    useEffect(() => {
        (async () => {
            if (wallet) {
                const balance = await connection.getBalance(wallet.publicKey)
                const solBalance = balance / LAMPORTS_PER_SOL
                setBalance(solBalance)
                setContextWallet(prevWallet => ({ 
                    ...prevWallet, 
                    balance: solBalance
                }))
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
                            <p>Your balance - {balance || contextWallet?.balance} SOL</p>
                            <p>Images remaining - {itemsRemaining || contextWallet?.itemsRemaining}</p>
                        </>
                    ) : (
                        <p>Generate a unique image</p>
                    )}
                </div>
                {wallet ? (
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={isSoldOut || isMinting || !isActive}
                        onClick={mintToken}
                    >
                        {isSoldOut ? (
                            'Sold Out'
                        ) : isActive ? (
                            isMinting ? (
                                <CircularProgress />
                            ) : (
                                'Mint Token'
                            )
                        ) : (
                            <CountDown
                                date={dateStart}
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
