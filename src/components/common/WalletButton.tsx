import { ConnectButton } from '@rainbow-me/rainbowkit'
import bnbIcon from '@/assets/bnb.svg'
import { shortenAddress } from '@/utils/format.ts'

const buttonClassName =
  'flex items-center gap-1 rounded-lg h-6 border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438] focus-visible:outline-none transition-transform active:translate-y-0.5'

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        if (!account || !chain) {
          return (
            <button
              type="button"
              onClick={openConnectModal}
              className={buttonClassName}
            >
              连接钱包
            </button>
          )
        }

        if (chain.unsupported) {
          return (
            <button
              type="button"
              onClick={openChainModal}
              className={buttonClassName}
            >
              切换网络
            </button>
          )
        }

        return (
          <button
            type="button"
            onClick={openAccountModal}
            className={buttonClassName}
          >
            <img src={bnbIcon} alt="" />
            {shortenAddress(account.address)}
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}
