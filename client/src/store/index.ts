import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import candyReducer from './candyStore/candyReducer'
import walletReducer from './cryptoWalletStore/walletReducer'
import metaReducer from './metadataStore/metaReducer';
import algorithmReducer from './algorithmSetupStore/algorithmReducer';
import assetsReducer from './assetsStore/assetsReducer'

const store = createStore(
    combineReducers({ 
        candy: candyReducer, 
        wallet: walletReducer, 
        metadata: metaReducer,
        outputConf: algorithmReducer,
        assetsSlices: assetsReducer
    }), 
    composeWithDevTools()
)

export default store