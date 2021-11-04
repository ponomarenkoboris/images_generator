import { web3 } from '@project-serum/anchor'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

export const treasury = new web3.PublicKey(
    '3ZgBR3aHx6eD9SrzmAVYBdP1GESyESFYfs65ZUWjH9Qa'
)

export const config = new web3.PublicKey(
    'H4jm8vsihxWsTevMhQ7CRWBKpb2ciBVU99ngAqKu5yyw'
)

export const candyMachineId = new web3.PublicKey(
    'AW7zCmUSLYdteruGRNstax5RuoUn2R6EyjEDzPYtbUXB'
)

export const network = 'devnet' as WalletAdapterNetwork

export const rpcHost = 'https://explorer-api.devnet.solana.com'

export const connection = new web3.Connection(rpcHost)

export const startDateSeed = parseInt('1635864815.483', 10)
