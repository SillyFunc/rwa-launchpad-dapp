import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

const enableTestnets = import.meta.env.VITE_ENABLE_TESTNETS === 'true'

export const wagmiConfig = getDefaultConfig({
  appName: 'RWA Launchpad',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [bsc, ...(enableTestnets ? [bscTestnet] : [])],
  transports: {
    [bsc.id]: http(import.meta.env.VITE_BSC_RPC_URL),
    [bscTestnet.id]: http(import.meta.env.VITE_BSC_TESTNET_RPC_URL),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
