import logo from '@/assets/logo.svg?url'
import menuIcon from '@/assets/menu.svg'
import { WalletButton } from '@/components/WalletButton.tsx'
import { Link } from 'react-router'

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Link
        className="text-white focus-visible:outline-none"
        aria-label="首页"
        to="/"
      >
        <span
          aria-hidden
          className="block shrink-0 bg-current [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] mask-center mask-no-repeat mask-contain w-23 h-5.25"
          style={{
            WebkitMaskImage: `url("${logo}")`,
            maskImage: `url("${logo}")`,
          }}
        ></span>
      </Link>
      <div className="flex items-center gap-2.5">
        <WalletButton />
        <button type="button" aria-label="菜单" aria-expanded>
          <img src={menuIcon} alt="" />
        </button>
      </div>
    </header>
  )
}
