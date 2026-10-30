import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { useReducedMotion } from 'motion/react'
import { Popup } from 'tdesign-mobile-react'
import { useSidebarStore } from '@/stores/useSidebarStore.ts'
import logoUrl from '@/assets/logo.svg'
import closeIcon from '@/assets/navigation/close.svg'
import chevronDownIcon from '@/assets/navigation/chevron-down.svg'
import socialCircle from '@/assets/navigation/social-circle.svg'
import {
  sidebarNavigationGroups,
  sidebarSocialLinks,
  type SidebarNavigationItem,
} from './sidebarNavigation.ts'

const focusClassName =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-400'

function NavigationItem({
  item,
  onNavigate,
}: {
  item: SidebarNavigationItem
  onNavigate: () => void
}) {
  const className = `flex min-h-11 w-full items-center gap-3 rounded-md text-left text-base font-medium ${focusClassName}`
  const content = (
    <>
      <span
        aria-hidden
        className="flex size-5 shrink-0 items-center justify-center"
      >
        <img src={item.icon} alt="" />
      </span>
      {item.label}
    </>
  )

  return item.to ? (
    <Link
      to={item.to}
      onClick={onNavigate}
      className={`${className} transition-colors hover:bg-white/5 hover:text-yellow-400`}
    >
      {content}
    </Link>
  ) : (
    <button
      type="button"
      disabled
      title="链接暂未配置"
      className={`${className} cursor-not-allowed`}
    >
      {content}
    </button>
  )
}

export function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen)
  const close = useSidebarStore((state) => state.close)
  const shouldReduceMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const trigger = document.activeElement
    const appRoot = document.getElementById('root')
    if (appRoot) appRoot.inert = true

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (appRoot) appRoot.inert = false
      if (trigger instanceof HTMLElement) trigger.focus({ preventScroll: true })
    }
  }, [isOpen, close])

  return (
    <Popup
      visible={isOpen}
      placement="right"
      // 与 TDesign 滑入动画的 0.3s 保持一致，默认 240ms 会提前截断动画
      duration={shouldReduceMotion ? 0 : 300}
      overlayProps={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClose={close}
      onOpened={() => closeButtonRef.current?.focus({ preventScroll: true })}
      className="pointer-events-none w-full [--td-popup-bg-color:transparent]"
    >
      <div className="mx-auto flex h-full w-full sm:max-w-sm flex-col px-4 pt-24">
        <section
          id="site-navigation"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sidebar-title"
          className="pointer-events-auto min-h-0 w-full overflow-y-auto overscroll-contain rounded-2xl bg-[#202020] p-6 text-white"
        >
          <h2 id="sidebar-title" className="sr-only">
            Navigation menu
          </h2>
          <div className="flex h-6 items-center justify-between">
            <img src={logoUrl} alt="Whotel" className="shrink-0" />
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="关闭菜单"
              onClick={close}
              className={`flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md bg-linear-to-r from-yellow-400 to-amber-400 transition-opacity hover:opacity-80 ${focusClassName}`}
            >
              <img src={closeIcon} alt="" />
            </button>
          </div>

          <nav aria-label="主导航" className="mt-5">
            {sidebarNavigationGroups.map((group, index) => (
              <ul
                key={group[0].label}
                className={`flex flex-col gap-0.5 ${index > 0 ? 'mt-3 border-t border-white/15 pt-2' : ''}`}
              >
                {group.map((item) => (
                  <li key={item.label}>
                    <NavigationItem item={item} onNavigate={close} />
                  </li>
                ))}
              </ul>
            ))}
          </nav>

          <div className="mt-4">
            <button
              type="button"
              disabled
              aria-label="语言：English"
              title="暂未配置其他语言"
              className="relative flex h-10 w-full cursor-not-allowed items-center justify-center gap-1 rounded-full bg-slate-700 text-sm"
            >
              <span aria-hidden>🇺🇸</span>
              English
              <img src={chevronDownIcon} alt="" className="absolute right-5" />
            </button>

            <div className="mt-4 flex items-center justify-between">
              {sidebarSocialLinks.map(({ label, icon, href }) => {
                const content = (
                  <>
                    <img
                      src={socialCircle}
                      alt=""
                      className="absolute inset-0"
                    />
                    <img src={icon} alt="" className="relative" />
                  </>
                )
                const className = `relative flex size-10 items-center justify-center rounded-full ${focusClassName}`

                return href ? (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    key={label}
                    type="button"
                    disabled
                    aria-label={label}
                    title="链接暂未配置"
                    className={`${className} cursor-not-allowed`}
                  >
                    {content}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </Popup>
  )
}
