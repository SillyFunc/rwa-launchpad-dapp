import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { Toast } from 'tdesign-mobile-react'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: showApiError,
  }),
  mutationCache: new MutationCache({
    onError: showApiError,
  }),
})

function showApiError(error: Error) {
  if (!(error instanceof Error)) return

  Toast.error({ message: error.message, duration: 4000 })
}
