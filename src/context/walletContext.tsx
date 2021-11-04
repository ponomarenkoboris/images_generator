import React, { createContext, useState } from 'react'

type ContextWallet = {
    balance: number | null
}

type ContextType = {
    contextWallet: ContextWallet
    setContextWallet: React.Dispatch<React.SetStateAction<ContextWallet>>
}

export const WalletContext = createContext({} as ContextType)

const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [contextWallet, setContextWallet] = useState({} as ContextWallet)
    return <WalletContext.Provider value={{ contextWallet, setContextWallet }}>{children}</WalletContext.Provider>
}

export default WalletContextProvider