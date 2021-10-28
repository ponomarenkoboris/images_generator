import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Tabs, Tab, Box } from '@material-ui/core'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

const NavBar = () => {
    const history = useHistory()

    const initialValue = history.location.pathname === '/' ? 0 : 1
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        value === 0 ? history.push('/') : history.push('/about')
    }, [value, history])

    return (
        <nav>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        textColor="primary"
                        indicatorColor="primary"
                        value={value}
                        onChange={(_, newValue: number) => setValue(newValue)}
                        aria-label="primary tabs example"
                    >
                        <Tab label="Mint NFT" {...a11yProps(0)} />
                        <Tab label="About" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </Box>
        </nav>
    )
}

export default NavBar
