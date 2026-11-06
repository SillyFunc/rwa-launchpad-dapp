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
              className="flex justify-center items-center gap-1 rounded-lg h-6 border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438] cursor-pointer focus-visible:outline-none transition-transform active:translate-y-0.5"
            >
              <span className="leading-none min-w-0 truncate">{label}</span>
            </button>
          )
        } else {
          return (
            <button
              type="button"
              aria-label={m.wallet_open()}
              onClick={show}
              className="flex justify-center items-center gap-1 rounded-lg h-6 border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438] cursor-pointer focus-visible:outline-none transition-transform active:translate-y-0.5"
            >
              <Wallet className="shrink-0 size-3.75" strokeWidth={1.5} />
              <span className="leading-none min-w-0 truncate">
                {address ? shortenAddress(address) : ''}
              </span>
            </button>
          )
        }
      }}
    </ConnectKitButton.Custom>
  )
}
