import App from '../App'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

const renderApp = (history: MemoryHistory<unknown>) => render(<Router history={history}><App /></Router>)

describe('Testing App component', () => {
    let history: MemoryHistory<unknown>
    beforeEach(() => {
        history = createMemoryHistory()
    })
    it('Should redirect to docs page', () => {
        history.push('/')
        renderApp(history)

        expect(screen.getByText(/Документация по созданию NFT коллекции/)).toBeInTheDocument()
    }) 

    it('Should render Generate collections page', () => {
        history.push('/generate-collection')
        renderApp(history)
        
        expect(screen.getByText(/Загрузить настройки с сервера/)).toBeInTheDocument()
    })
})