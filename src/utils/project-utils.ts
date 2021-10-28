import { web3 } from '@project-serum/anchor'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

export const treasury = new web3.PublicKey(
    '6mkg9xSeh2mFv3GStGpobcCB1G3GNtrE7xUoa8cCV4bn'
)

export const config = new web3.PublicKey(
    '59cUUgQySaPMy72S96GoquR9NHZh5R53kZp2KrettrrM'
)

export const candyMachineId = new web3.PublicKey(
    'Cg1LeScAAaBkCzoLMJ5YeB65dg5UC44pwCVFyJaL413K'
)

export const network = 'devnet' as WalletAdapterNetwork

export const rpcHost = 'https://explorer-api.devnet.solana.com'

export const connection = new web3.Connection(rpcHost)

export const startDateSeed = parseInt('1635253097.677', 10)
