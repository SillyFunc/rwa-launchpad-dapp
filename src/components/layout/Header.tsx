import logo from '@/assets/logo.svg?url'
import menuIcon from '@/assets/menu.svg'
import { WalletButton } from '@/components/WalletButton.tsx'
import { motion, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router'

export function Header() {
  const { scrollY } = useScroll()
  const glassOpacity = useTransform(scrollY, [0, 24], [0, 1])

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between p-4">
      <motion.div
        aria-hidden
        style={{ opacity: glassOpacity }}
        className="absolute inset-0 -z-10 border-b border-white/10 bg-black/60 backdrop-blur-xl backdrop-saturate-150"
      />
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
