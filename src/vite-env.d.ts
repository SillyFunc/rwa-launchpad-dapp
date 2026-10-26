interface ImportMetaEnv {
  readonly VITE_WALLETCONNECT_PROJECT_ID: string
  readonly VITE_ENABLE_TESTNETS?: string
  readonly VITE_BSC_RPC_URL?: string
  readonly VITE_BSC_TESTNET_RPC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
