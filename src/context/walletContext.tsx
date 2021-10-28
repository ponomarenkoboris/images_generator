import { createContext, useState } from 'react'

export type Wallet = {
    balance?: number | null
    itemsRemaining?: number | null
}

type WalletContextType = {
    contextWallet: Wallet | null
    setContextWallet: React.Dispatch<React.SetStateAction<Wallet | null>>
}

type WalletContextProviderProps = {
    children: React.ReactNode
}

export const WalletContext = createContext({} as WalletContextType)

export const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
    const [contextWallet, setContextWallet] = useState<Wallet | null>(null)
    return <WalletContext.Provider value={{ contextWallet, setContextWallet }}>{children}</WalletContext.Provider>
}