import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCandyConfig, resetCandyConfig } from '../../store/candyStore/candyActionCreators'
import { UpdateMachineConfigProps } from '../../store/candyStore/types'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { fetchCandyMachine } from '../helpers/utils'
import './CandyMachineSetup.scss'

const initialState = {
    treasury: '',
    config: '',
    candyMachineId: '',
    network: '',
    connection: '',
    startDateSeed: ''
}

const clusters = [
    { id: 1, cluster: 'devnet' },
    { id: 2, cluster: 'mainnet' },
    { id: 3, cluster: 'testnet' }
]

const rpcHosts = [
    { id: 1, rpcHost: 'https://api.testnet.solana.com' },
    { id: 2, rpcHost: 'https://api.devnet.solana.com' },
    { id: 3, rpcHost: 'https://api.mainnet-beta.solana.com' },
    { id: 4, rpcHost: 'https://solana-api.projectserum.com' },
]

export const CandyMachineSetup = () => {
    const machineConfig = useSelector((state: { candy: UpdateMachineConfigProps }) => state.candy)
    const [conf, setConf] = useState(machineConfig)
    const [isShown, setIsShonw] = useState(false)
    const dispatch = useDispatch()

    const updateCandyMachine = async () => {
        await fetchCandyMachine('update', conf)
        dispatch(updateCandyConfig(conf))
        setIsShonw(false)
    }
    
    const resetCandyMachine = async () => {
        await fetchCandyMachine('reset')
        dispatch(resetCandyConfig())
        setConf(initialState)
    }

    const getCandyMachine = async () => {
        const serverConfig = await fetchCandyMachine('get')
        if (serverConfig) {
            dispatch(updateCandyConfig(serverConfig))
            setConf(serverConfig)
        }
    }

    useEffect(() => {
        getCandyMachine()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='candy__setup'>
            {isShown ? (
                <form>
                    <TextField
                        className='candy__setup-form__item'
                        label={'Адресс кошелька создателя (authority)'}
                        value={conf.treasury}
                        onChange={e => setConf(prevConf => ({ ...prevConf, treasury: e.target.value }))}
                    />
                    <TextField
                        className='candy__setup-form__item'
                        label={'Конфигурация (config)'} 
                        value={conf.config}
                        onChange={e => setConf(prevConf => ({ ...prevConf, config: e.target.value }))}
                    />
                    <TextField
                        className='candy__setup-form__item'
                        label={'Идентификатор Candy Machine (candyMachineAddress)'}
                        value={conf.candyMachineId}
                        onChange={e => setConf(prevConf => ({ ...prevConf, candyMachineId: e.target.value }))}
                    />
                    <TextField 
                        className='candy__setup-form__item'
                        label={'Дата запуска Candy Machine (startDate)'}
                        value={conf.startDateSeed}
                        onChange={e => setConf(prevConf => ({ ...prevConf, startDateSeed: e.target.value }))}
                    />
                    <FormControl
                        className='candy__setup-form__item'
                    >
                        <InputLabel id="network-cluster">Выбирите solana-cluster (env)</InputLabel>
                        <Select
                            labelId="network-cluster"
                            id="network-cluster-select"
                            value={conf.network}
                            onChange={e => setConf(prevConf => ({ ...prevConf, network: e.target.value as string }))}
                        >
                            {clusters.map(({ id, cluster }) => <MenuItem key={id} value={cluster}>{cluster}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl
                        className='candy__setup-form__item'
                    >
                        <InputLabel id="connection-url">Выбирите RPC HOST</InputLabel>
                        <Select
                            labelId="connection-url"
                            id="connection-url-select"
                            value={conf.connection}
                            onChange={e => setConf(prevConf => ({ ...prevConf, connection: e.target.value as string}))}
                        >
                            {rpcHosts.map(({ id, rpcHost }) => <MenuItem key={id} value={rpcHost}>{rpcHost}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <div className="candy__setup-actions" >
                        <Button
                            variant="contained" 
                            color="primary" 
                            onClick={updateCandyMachine}
                        >
                            Включить Candy Machine
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={resetCandyMachine}
                        >
                            Сбросить настройки
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={getCandyMachine}
                        >
                            Загрузить с сервера
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={() => setIsShonw(false)}
                        >
                            Скрыть меню настроек
                            <KeyboardArrowUpIcon />
                        </Button>
                    </div>
                </form>
            ) : (
                <div className='open__setup-button'>
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={() => setIsShonw(true)}
                    >
                        Изменить настройки
                        <KeyboardArrowDownIcon />
                    </Button>
                </div>
            )}
        </div>
    )
}