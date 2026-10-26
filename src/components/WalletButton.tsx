import { ConnectKitButton } from 'connectkit'
import bnbIcon from '@/assets/bnb.svg'

const buttonClassName =
  'flex items-center gap-1 rounded-lg h-6 border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438]'

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-6)}`
}

export function WalletButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, address, unsupported, show }) => {
        if (!isConnected || !address) {
          return (
            <button type="button" onClick={show} className={buttonClassName}>
              连接钱包
            </button>
          )
        }

        if (unsupported) {
          return (
            <button type="button" onClick={show} className={buttonClassName}>
              切换网络
            </button>
          )
        }

        return (
          <button type="button" onClick={show} className={buttonClassName}>
            <img src={bnbIcon} alt="" />
            {shortenAddress(address)}
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
