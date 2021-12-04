import React from 'react'
import { Route } from 'react-router-dom'
import Layout from './layout'

const Documentation = React.lazy(() => import('./Documentation'))
const CreateCollectables = React.lazy(() => import('./CreateCollectables'))
const Mint = React.lazy(() => import('./Mint'))

const App = () => {
    return (
        <Layout>
            <Route path='/docs'>
                <Documentation />
            </Route>
            <Route path='/mint'>
                <Mint />            
            </Route>
            <Route path='/generate-collection'>
                <CreateCollectables />
            </Route>
        </Layout>
    )
}

export default App;
