import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tab, Box } from '@material-ui/core'
import { TabList, TabContext } from '@material-ui/lab';
import './Header.scss'

enum Routes {
    MINT = '/mint',
    DOCS = '/docs',
    GENERATE_COLLECTION = '/generate-collection'
}

const Header = () => {
    const history = useHistory()
    const [pathname, setPathname] = useState(history.location.pathname === '/' ? Routes.DOCS : history.location.pathname)

    useEffect(() => {
        if (history.location.pathname !== Routes.DOCS && 
            history.location.pathname !== Routes.MINT && 
            history.location.pathname !== Routes.GENERATE_COLLECTION
        ) {
            history.push(Routes.DOCS)
            setPathname(Routes.DOCS)
        }
    }, [history])

    const changeRoute = (e: React.ChangeEvent<{}>, pathname: string) => {
        history.push(pathname)
        setPathname(pathname)
    }

    return (
        <header className="header">
            <nav>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabContext value={pathname}>
                            <TabList 
                                textColor="primary"
                                indicatorColor="primary"
                                onChange={changeRoute}
                            >
                                <Tab label="Docs" value={Routes.DOCS} />
                                <Tab label="Generate collection" value={Routes.GENERATE_COLLECTION} />
                                <Tab label="Mint NFT" value={Routes.MINT} />
                            </TabList>
                        </TabContext>
                    </Box>
                </Box>
            </nav>
        </header>
    )
}

export default Header