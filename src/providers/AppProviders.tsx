import type { ReactNode } from 'react'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { queryClient } from '../config/queryClient.ts'
import { wagmiConfig } from '../config/wagmi.ts'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
