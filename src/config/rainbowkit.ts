import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets'
import { bsc, bscTestnet } from 'viem/chains'
import { fallback, http, webSocket } from 'wagmi'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
const bscRpcUrl = import.meta.env.VITE_BSC_RPC_URL
const enableTestnets = import.meta.env.VITE_ENABLE_TESTNETS === 'true'

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: projectId ?? '',
  // 无 projectId 时 WalletConnect 系钱包创建即抛错，退回仅浏览器注入钱包
  wallets: projectId
    ? undefined
    : [{ groupName: 'Other', wallets: [injectedWallet] }],
  chains: [bsc, ...(enableTestnets ? [bscTestnet] : [])],
  transports: {
    [bsc.id]: fallback([
      ...(bscRpcUrl ? [http(bscRpcUrl)] : []),
      http('https://bsc-rpc.publicnode.com'),
      webSocket('wss://bsc-rpc.publicnode.com'),
    ]),
    [bscTestnet.id]: http(import.meta.env.VITE_BSC_TESTNET_RPC_URL),
  },
  ssr: false,
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
