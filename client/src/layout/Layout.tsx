import { Suspense, useMemo } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { getPhantomWallet, getSlopeWallet, getSolflareWallet, getSolletWallet, getSolletExtensionWallet } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { AnchorWalletContextProvider } from '../context/AnchorWalletContext'
import { useCandyConf } from '../hooks'
import Header from './Header'
import './Layout.scss'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps ) => {
    const machineConf = useCandyConf()
    const endpoint = useMemo(() => clusterApiUrl(machineConf?.network), [machineConf?.network])
    const wallets = useMemo(() => [
        getPhantomWallet(), 
        getSlopeWallet(), 
        getSolflareWallet(), 
        getSolletWallet({ network: machineConf?.network }), 
        getSolletExtensionWallet({ network: machineConf?.network })
    ], [machineConf?.network])

    return (
        <Router>
            <Header />
            <main>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect={true}>
                        <WalletDialogProvider>
                            <AnchorWalletContextProvider>
                                <Switch>
                                    <Suspense fallback={<div>Загрзка...</div>}>
                                        {children}  
                                    </Suspense>
                                </Switch>
                            </AnchorWalletContextProvider>
                        </WalletDialogProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </main>
        </Router>
    )
}

export default Layout