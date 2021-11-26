import Header from '../Header'
// import App from '../../../App'w
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, screen, fireEvent } from '@testing-library/react'

const renderComponent = (history: MemoryHistory<unknown>, children: React.ReactNode) => render(<Router history={history}>{children}</Router>)

describe('Test Header component', () => {
    let history: MemoryHistory<unknown>
    beforeEach(() => {
        history = createMemoryHistory()
    })

    it('On click tab with name DOCS should render docs page', () => {
        renderComponent(history, <Header />)
        fireEvent.click(screen.getByText(/DOCS/i))
        expect(history.location.pathname).toBe('/docs')

        // const { container } = renderComponent(history, <App />)
        // expect(container.querySelector('.docs')).toBe(true)
    })

    it('On click tab with name GENERATE COLLECTION should render generate collection page', () => {
        renderComponent(history, <Header />)
        fireEvent.click(screen.getByText(/GENERATE COLLECTION/i))
        expect(history.location.pathname).toBe('/generate-collection')
    })

    it('On click tab with name MINT NFT should render mint nft page', () => {
        renderComponent(history, <Header />)
        fireEvent.click(screen.getByText(/MINT NFT/i))
        expect(history.location.pathname).toBe('/mint')
    })

    it('If pathname is equal to "/" should redirect to docs page', () => {
        history.push('/')
        renderComponent(history, <Header />)
        expect(history.location.pathname).toBe('/docs')
    })

    it('If pathname is not exist, should redirect to docs page', () => {
        history.push('/ifodoid')
        renderComponent(history, <Header />)
        expect(history.location.pathname).toBe('/docs')
    })
})