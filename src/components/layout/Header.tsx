import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { WalletButton } from '@/components/WalletButton.tsx'
import { useSidebarStore } from '@/stores/useSidebarStore.ts'
import { Sidebar } from './Sidebar.tsx'
import logoUrl from '@/assets/logo.svg?url'
import menuUrl from '@/assets/menu.svg?url'

export function Header() {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen)
  const openSidebar = useSidebarStore((state) => state.open)
  const { scrollY } = useScroll()
  const glassOpacity = useTransform(scrollY, [0, 24], [0, 1])
  const borderColor = useTransform(
    glassOpacity,
    [0, 1],
    ['#484B51', '#484B5100'],
  )

  return (
    <motion.header
      style={{ borderBottomColor: borderColor }}
      className="sticky top-0 z-40 flex items-center justify-between p-4 border-b"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glassOpacity }}
        className="absolute inset-x-0 top-0 -bottom-px -z-10 bg-black/60 backdrop-blur-xl backdrop-saturate-150"
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
            WebkitMaskImage: `url("${logoUrl}")`,
            maskImage: `url("${logoUrl}")`,
          }}
        ></span>
      </Link>
      <div className="flex items-center gap-2.5 shrink-0">
        <WalletButton />
        <button
          type="button"
          aria-label="菜单"
          aria-haspopup="dialog"
          aria-controls="site-navigation"
          aria-expanded={isSidebarOpen}
          onClick={openSidebar}
          className="size-6 flex cursor-pointer items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400 transition-transform active:translate-y-0.5"
        >
          <img
            src={menuUrl}
            decoding="async"
            loading="lazy"
            fetchPriority="low"
            className="size-full object-cover"
            alt=""
          />
        </button>
      </div>
      <Sidebar />
    </motion.header>
  )
}
