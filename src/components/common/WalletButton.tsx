import { shortenAddress } from '@/utils/format.ts'
import { ConnectKitButton } from 'connectkit'
import { Wallet } from 'lucide-react'

export function WalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        if (!isConnected) {
          return (
            <button
              aria-label="连接钱包"
              type="button"
              onClick={show}
              className="flex justify-center items-center gap-1 rounded-lg h-6 border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438] cursor-pointer focus-visible:outline-none transition-transform active:translate-y-0.5"
            >
              <span className="leading-none min-w-0 truncate">连接钱包</span>
            </button>
          )
        } else {
          return (
            <button
              type="button"
              aria-label="打开钱包"
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
