import { createContext, useState } from "react"

type WalletContextType = {
    balance: number | null
    setBalance: React.Dispatch<React.SetStateAction<number | null>>
}

export const WalletContext = createContext({} as WalletContextType)

export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [balance, setBalance] = useState<number | null>(null)
    return <WalletContext.Provider value={{ balance, setBalance }}>{children}</WalletContext.Provider>
}