import { Switch, Route } from 'react-router-dom'
import About from '../about-view/About'
import Mint from '../mint-view/Mint'
import { candyMachineId, config, connection, startDateSeed, treasury } from '../../utils/project-utils'
import WalletContextProvider from '../../context/WalletContext'

const txTimeout = 30000

const MainLayout = () => {
    return (
        <>
            <WalletContextProvider>
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route exact path="/">
                            <Mint
                                candyMachineId={candyMachineId}
                                config={config}
                                connection={connection}
                                startDate={startDateSeed}
                                treasury={treasury}
                                txTimeout={txTimeout}
                            />
                    </Route>
                </Switch>
            </WalletContextProvider>
        </>
    )
}

export default MainLayout