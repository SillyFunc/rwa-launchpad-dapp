import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { queryClient } from '@/config/queryClient.ts'
import { ConnectKitProvider } from 'connectkit'
import { config } from '@/config/wagmi.ts'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="midnight" mode="dark" debugMode>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
