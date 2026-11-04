import { bsc, bscTestnet } from 'wagmi/chains'
import { createConfig, fallback, http, injected, webSocket } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID!,
      showQrModal: false,
    }),
  ],
  transports: {
    [bsc.id]: fallback([
      http('https://bsc-rpc.publicnode.com'),
      webSocket('wss://bsc-rpc.publicnode.com'),
    ]),
    [bscTestnet.id]: fallback([
      http('https://bsc-testnet-rpc.publicnode.com'),
      webSocket('wss://bsc-testnet-rpc.publicnode.com'),
    ]),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
