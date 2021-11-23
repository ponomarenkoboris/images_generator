import { web3 } from "@project-serum/anchor"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

export type UpdateMachineConfigProps = {
    [treasury: string]: string
    config: string
    candyMachineId: string
    network: string
    connection: string
    startDateSeed: string
}

export type MachineConfig = {
    treasury: web3.PublicKey
    config: web3.PublicKey
    candyMachineId: web3.PublicKey
    network: WalletAdapterNetwork
    connection: web3.Connection
    startDateSeed: number
}

export type UseCandyMachineHook = {
    config: MachineConfig | null
    machineConfigValues: UpdateMachineConfigProps,
    updateMachineConfig: (config: UpdateMachineConfigProps) => void
}

export type ActionCreator = {
    type: string
    payload?: UpdateMachineConfigProps
}