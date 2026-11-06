import { QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, type Types } from 'connectkit'
import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'

import { queryClient } from '@/config/queryClient.ts'
import { config } from '@/config/wagmi.ts'
import { getLocale } from '@/i18n/locale.ts'

// ConnectKit 没有 zh-Hant 文案包，繁体界面使用简体。
const connectKitLanguage = {
  en: 'en-US',
  'zh-Hant': 'zh-CN',
} as const satisfies Record<ReturnType<typeof getLocale>, Types.Languages>

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="midnight"
          mode="dark"
          debugMode
          options={{ language: connectKitLanguage[getLocale()] }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
