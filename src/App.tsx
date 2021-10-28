import { useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import About from './components/about-view/About'
import Mint from './components/mint-view/Mint'
import './App.scss'
import { clusterApiUrl } from '@solana/web3.js'
import { getPhantomWallet, getSlopeWallet, getSolflareWallet, getSolletWallet, getSolletExtensionWallet } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import { network, candyMachineId, config, connection, startDateSeed, treasury } from './utils/project-utils'
import { WalletContextProvider } from './context/walletContext'

const txTimeout = 30000

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
                <main>
                    <Switch>
                        <WalletContextProvider>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route exact path="/">
                                <ConnectionProvider endpoint={endpoint}>
                                    <WalletProvider wallets={wallets} autoConnect={true}>
                                        <WalletDialogProvider>
                                            <Mint
                                                candyMachineId={candyMachineId}
                                                config={config}
                                                connection={connection}
                                                startDate={startDateSeed}
                                                treasury={treasury}
                                                txTimeout={txTimeout}
                                            />
                                        </WalletDialogProvider>
                                    </WalletProvider>
                                </ConnectionProvider>
                            </Route>
                        </WalletContextProvider>
                    </Switch>
                </main>
            </Router>
        </>
    )
}

export default App
