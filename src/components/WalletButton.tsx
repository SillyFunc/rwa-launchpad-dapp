import { ConnectKitButton } from 'connectkit'
import bnbIcon from '@/assets/bnb.svg'
import { shortenAddress } from '@/utils/format.ts'

const buttonClassName =
  'flex items-center gap-1 rounded-lg h-6 border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438]'

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
