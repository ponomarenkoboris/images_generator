import { web3 } from '@project-serum/anchor'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

export const treasury = new web3.PublicKey(
    'DSv8huUhNzgpyrtQ5RBFiXbpgpGFe4wxjRGFUiLNCF3B' // in .cache/[...]-tmep file, authority field (after upload assets)
)

export const config = new web3.PublicKey(
    '3x4teKbQifidM1tqmeoakjTMRNgD9xmXoeaqNgVzbKcq' // in .cache/[...]-tmep file, config field (after upload assets)
)

export const candyMachineId = new web3.PublicKey(
    'HRqDFjGwcaqxSwRrSxDbbABVqEuBPzWYVEp5VD9y5Eoi' // in .cache/[...]-tmep file, candyMachineAddress field (after upload assets)
)

export const network = 'devnet' as WalletAdapterNetwork // 

export const rpcHost = 'https://explorer-api.devnet.solana.com'

export const connection = new web3.Connection(rpcHost)

export const startDateSeed = parseInt('1636469840.249', 10) // - in .cache/[...]-tmep file, startDate field (after upload assets)
