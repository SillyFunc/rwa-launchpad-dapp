import { ConnectButton } from '@rainbow-me/rainbowkit'
import bnbIcon from '@/assets/bnb.svg'

const buttonClassName =
  'flex items-center gap-1 rounded-lg h-6 border border-[#fcd438] px-2.5 text-xs font-medium text-[#fcd438]'

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-6)}`
}

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
        if (!mounted || !account || !chain) {
          return (
            <button type="button" onClick={openConnectModal} className={buttonClassName}>
              连接钱包
            </button>
          )
        }

        if (chain.unsupported) {
          return (
            <button type="button" onClick={openChainModal} className={buttonClassName}>
              切换网络
            </button>
          )
        }

        return (
          <button type="button" onClick={openAccountModal} className={buttonClassName}>
            <img src={bnbIcon} alt="" />
            {shortenAddress(account.address)}
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}
