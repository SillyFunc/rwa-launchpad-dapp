import { createConfig, fallback, http, injected, webSocket } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
const bscRpcUrl = import.meta.env.VITE_BSC_RPC_URL
const enableTestnets = import.meta.env.VITE_ENABLE_TESTNETS === 'true'

export const wagmiConfig = createConfig({
  chains: [bsc, ...(enableTestnets ? [bscTestnet] : [])],
  connectors: [
    injected(),
    ...(projectId ? [walletConnect({ projectId, showQrModal: false })] : []),
  ],
  transports: {
    [bsc.id]: fallback([
      ...(bscRpcUrl ? [http(bscRpcUrl)] : []),
      http('https://bsc-rpc.publicnode.com'),
      webSocket('wss://bsc-rpc.publicnode.com'),
    ]),
    [bscTestnet.id]: http(import.meta.env.VITE_BSC_TESTNET_RPC_URL),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
