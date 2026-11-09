import {
  BaseError as ViemBaseError,
  ChainMismatchError,
  InsufficientFundsError,
  UserRejectedRequestError,
} from 'viem'
import {
  BaseError as WagmiBaseError,
  ChainNotConfiguredError,
  ConnectorChainMismatchError,
} from 'wagmi'

import { ApiError } from '@/api/client.ts'
import { m } from '@/paraglide/messages.js'

function hasCause(error: unknown, match: (cause: object) => boolean) {
  let cause = error
  while (typeof cause === 'object' && cause !== null) {
    if (match(cause)) return true
    cause = (cause as { cause?: unknown }).cause
  }
  return false
}

// 返回 null 表示无需提示用户
export function resolveErrorMessage(error: unknown): string | null {
  if (error instanceof ApiError) return error.message

  // 部分钱包只抛出带 EIP-1193 code 4001 的普通对象，未经 viem 包装
  const rejected = hasCause(
    error,
    (cause) =>
      cause instanceof UserRejectedRequestError ||
      ('code' in cause && cause.code === 4001),
  )
  if (rejected) return null

  if (hasCause(error, (cause) => cause instanceof InsufficientFundsError)) {
    return m.wallet_insufficient_funds()
  }
  const wrongNetwork = hasCause(
    error,
    (cause) =>
      cause instanceof ChainMismatchError ||
      cause instanceof ConnectorChainMismatchError ||
      cause instanceof ChainNotConfiguredError,
  )
  if (wrongNetwork) return m.wallet_wrong_network()

  if (error instanceof ViemBaseError || error instanceof WagmiBaseError) {
    return m.chain_request_failed()
  }
  return m.request_failed()
}
