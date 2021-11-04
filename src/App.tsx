import { useMemo } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import MainLayout from './components/layout/MainLayout'
import './App.scss'
import { clusterApiUrl } from '@solana/web3.js'
import { getPhantomWallet, getSlopeWallet, getSolflareWallet, getSolletWallet, getSolletExtensionWallet } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import { network } from './utils/project-utils'

const App = () => {
    const endpoint = useMemo(() => clusterApiUrl(network), [])
    const wallets = useMemo(() => [
        getPhantomWallet(), 
        getSlopeWallet(), 
        getSolflareWallet(), 
        getSolletWallet({ network }), 
        getSolletExtensionWallet({ network })
    ], [])

    return (
        <>
            <Router>
                <NavBar />
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={wallets} autoConnect={true}>
                        <WalletDialogProvider>
                            <MainLayout />
                        </WalletDialogProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </Router>
        </>
    )
}

export default App
