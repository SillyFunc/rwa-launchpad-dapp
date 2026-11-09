import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { Toast } from 'tdesign-mobile-react'

import { ApiError } from '@/api/client.ts'
import { resolveErrorMessage } from '@/utils/error.ts'

type ErrorToastMeta = {
  toast?: boolean
  errorMessage?: () => string
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: ErrorToastMeta
    mutationMeta: ErrorToastMeta
  }
}

// ConnectKit 弹窗自己展示这些操作的失败状态，页面加载时的静默重连失败也不应打扰用户
const walletUiMutationKeys = new Set([
  'connect',
  'reconnect',
  'disconnect',
  'switchChain',
])

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.toast ?? error instanceof ApiError) {
        showError(error, query.meta)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _onMutateResult, mutation) => {
      const key = mutation.options.mutationKey?.[0]
      const isWalletUi =
        typeof key === 'string' && walletUiMutationKeys.has(key)
      if (mutation.meta?.toast ?? !isWalletUi) {
        showError(error, mutation.meta)
      }
    },
  }),
})

function showError(error: unknown, meta?: ErrorToastMeta) {
  const message = resolveErrorMessage(error)
  if (message === null) return

  Toast.error({ message: meta?.errorMessage?.() ?? message, duration: 4000 })
}
