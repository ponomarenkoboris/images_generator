import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './shared'
import useCandyConf from "./hooks/useCandyConf"
import { useMemo } from "react"
import { clusterApiUrl } from '@solana/web3.js'
import { getPhantomWallet, getSlopeWallet, getSolflareWallet, getSolletWallet, getSolletExtensionWallet } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui'
import './App.scss';
const Documentation = React.lazy(() => import('./Documentation'))
const CreateCollectables = React.lazy(() => import('./CreateCollectables'))
const Mint = React.lazy(() => import('./Mint'))

const App = () => {
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
        <div className="app">
            <Router>
                <Header />
                <main>
                    <Switch>
                        <ConnectionProvider endpoint={endpoint}>
                            <WalletProvider wallets={wallets} autoConnect={true}>
                                <WalletDialogProvider>
                                    <Suspense fallback={<div>Загрзка...</div>}>
                                        <Route path='/docs'>
                                            <Documentation />
                                        </Route>
                                        <Route path='/mint'>
                                            <Mint />            
                                        </Route>
                                        <Route path='/generate-collection'>
                                            <CreateCollectables />
                                        </Route>
                                    </Suspense>
                                </WalletDialogProvider>
                            </WalletProvider>
                        </ConnectionProvider>
                    </Switch>
                </main>
            </Router>
        </div>
    )
}

export default App;
