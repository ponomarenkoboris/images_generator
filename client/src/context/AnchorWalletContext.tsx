import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { createContext } from "react";

export const AnchorWalletContext = createContext<AnchorWallet | undefined>(undefined)

type AnchorWalletContextProviderProps = {
    children: React.ReactNode
}

export const AnchorWalletContextProvider = ({ children }: AnchorWalletContextProviderProps) => {
    const wallet = useAnchorWallet()
    return (
        <AnchorWalletContext.Provider value={wallet}>
            {children}
        </AnchorWalletContext.Provider>
    )
}