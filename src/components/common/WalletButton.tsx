import { ConnectKitButton } from 'connectkit'
import { Wallet } from 'lucide-react'

import { m } from '@/paraglide/messages.js'
import { shortenAddress } from '@/utils/format.ts'

export function WalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        if (!isConnected) {
          const label = m.wallet_connect()
          return (
            <button
              aria-label={label}
              type="button"
              onClick={show}
              className="flex h-6 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438] transition-transform focus-visible:outline-none active:translate-y-0.5"
            >
              <span className="min-w-0 truncate leading-none">{label}</span>
            </button>
          )
        } else {
          return (
            <button
              type="button"
              aria-label={m.wallet_open()}
              onClick={show}
              className="flex h-6 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438] transition-transform focus-visible:outline-none active:translate-y-0.5"
            >
              <Wallet className="size-3.75 shrink-0" strokeWidth={1.5} />
              <span className="min-w-0 truncate leading-none">
                {address ? shortenAddress(address) : ''}
              </span>
            </button>
          )
        }
      }}
    </ConnectKitButton.Custom>
  )
}
