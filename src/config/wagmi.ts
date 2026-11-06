import { createConfig, fallback, http, injected, webSocket } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
const enableTestnets = import.meta.env.VITE_ENABLE_TESTNETS === 'true'

const BSC_PUBLIC_RPC_HTTP = 'https://bsc-rpc.publicnode.com'
const BSC_PUBLIC_RPC_WS = 'wss://bsc-rpc.publicnode.com'
const BSC_TESTNET_PUBLIC_RPC_HTTP = 'https://bsc-testnet-rpc.publicnode.com'
const BSC_TESTNET_PUBLIC_RPC_WS = 'wss://bsc-testnet-rpc.publicnode.com'

export const config = createConfig({
  chains: [bsc, ...(enableTestnets ? [bscTestnet] : [])],
  connectors: [
    injected(),
    ...(projectId ? [walletConnect({ projectId, showQrModal: false })] : []),
  ],
  transports: {
    [bsc.id]: fallback([
      http(BSC_PUBLIC_RPC_HTTP),
      webSocket(BSC_PUBLIC_RPC_WS),
    ]),
    [bscTestnet.id]: fallback([
      http(BSC_TESTNET_PUBLIC_RPC_HTTP),
      webSocket(BSC_TESTNET_PUBLIC_RPC_WS),
    ]),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
