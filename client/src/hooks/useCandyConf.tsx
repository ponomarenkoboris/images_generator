import { web3 } from '@project-serum/anchor'
import { useSelector } from 'react-redux'
import { UpdateMachineConfigProps, MachineConfig } from '../store/candyStore/types'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

const useCandyConf = (): MachineConfig | null => {
    const currentConfig = useSelector((state: { candy: UpdateMachineConfigProps }) => state.candy)
    const machineConfig: MachineConfig = {} as MachineConfig

    for (const key in currentConfig) {
        const valueExist = !!currentConfig[key].trim().length
        if (!valueExist) return null
        
        switch (key) {
            case 'treasury':
            case 'config':
            case 'candyMachineId':
                machineConfig[key] = new web3.PublicKey(currentConfig[key])
                break
            case 'network':
                machineConfig[key] = currentConfig[key] as WalletAdapterNetwork
                break
            case 'connection':
                machineConfig[key] = new web3.Connection(currentConfig[key])
                break
            case 'startDateSeed':
                machineConfig[key] = parseInt(currentConfig[key], 10)
                break
        }
    }

    return machineConfig
}

export default useCandyConf