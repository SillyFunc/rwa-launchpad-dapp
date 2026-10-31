import { useEffect, useId, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import rwaAssetsBanner from '@/assets/home/banner-rwa-assets.webp'
import realEstateBanner from '@/assets/home/banner-rwa-real-estate.webp'
import { NoticeMarquee } from './NoticeMarquee.tsx'

const BANNER_INTERVAL = 5000
const banners = [
  {
    src: rwaAssetsBanner,
    alt: 'Real assets. Digital future. Tokenize with Whotel RWA.',
  },
  {
    src: realEstateBanner,
    alt: 'Real estate. Reimagined. Launch assets on-chain.',
  },
]

const notice =
  'Welcome to Whotel RWA — tokenize, trade, and manage real-world assets across real estate, finance, Web3, venture capital, and entertainment. Redefining access, liquidity, and transparency in real-world asset tokenization, with a fully compliant, no-code platform, integrated KYC/KYB, and easy onboarding. Complete your KYC verification to get started.'

export function HeroBanner() {
  const arrowGradientId = useId()
  const carouselRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(carouselRef)
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false)

  useEffect(() => {
    if (!isInView || shouldReduceMotion || isHovered || isTouching || isKeyboardFocused) return

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % banners.length)
    }, BANNER_INTERVAL)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isInView, shouldReduceMotion, isHovered, isTouching, isKeyboardFocused])

  return (
    <div className="relative">
      <div className="relative pt-4 px-3">
        <div
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured assets"
          onPointerEnter={(event) => {
            if (event.pointerType !== 'touch') setIsHovered(true)
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'touch') setIsTouching(false)
            else setIsHovered(false)
          }}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') setIsTouching(true)
          }}
          onPointerUp={(event) => {
            if (event.pointerType === 'touch') setIsTouching(false)
          }}
          onPointerCancel={(event) => {
            if (event.pointerType === 'touch') setIsTouching(false)
          }}
          onFocus={(event) => {
            setIsKeyboardFocused(event.target.matches(':focus-visible'))
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsKeyboardFocused(false)
          }}
          className="relative aspect-[1983/793] w-full overflow-hidden rounded border border-[#484B51] bg-[#171717]"
        >
          {banners.map((banner, index) => (
            <motion.img
              key={banner.src}
              src={banner.src}
              alt={banner.alt}
              aria-hidden={index !== activeIndex}
              draggable={false}
              fetchPriority={index === 0 ? 'high' : 'low'}
              decoding="async"
              initial={false}
              animate={{ opacity: index === activeIndex ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
              className="absolute inset-0 size-full object-cover"
            />
          ))}
          <div role="group" aria-label="Choose a banner" className="absolute bottom-0 left-1/2 flex -translate-x-1/2">
            {banners.map((banner, index) => (
              <button
                key={banner.src}
                type="button"
                aria-label={`Show banner ${index + 1} of ${banners.length}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
                className="grid size-9 place-items-center rounded focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-yellow-400"
              >
                <span
                  aria-hidden="true"
                  className={`block size-2 border ${index === activeIndex ? 'border-white bg-white' : 'border-white/70 bg-black/40'}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="gradient-border mx-3 mt-8 flex h-7.25 items-center rounded-t-xl bg-[#0c0c0d] pr-2.5">
        <div className="relative flex h-full w-21.75 shrink-0 items-center gap-1.25 rounded-tl-xl rounded-tr-xs rounded-br-2xl bg-linear-to-r from-[#fefe00] to-[#cf4f00] pl-2.5">
          <span className="text-sm font-bold text-[#090e11]">通知公告</span>
          <span className="flex h-2 w-1.5 items-center justify-center">
            <Play
              aria-hidden
              strokeWidth={0}
              className="size-2.5 shrink-0 fill-[#090e11]"
            />
          </span>
        </div>
        <NoticeMarquee
          text={notice}
          className="ml-1.5 min-w-0 flex-1 text-xs font-medium text-white"
        />
        <span className="relative ml-2 flex h-2.5 w-1.75 shrink-0 items-center justify-center">
          <Play
            aria-hidden
            strokeWidth={0}
            fill={`url(#${arrowGradientId})`}
            className="size-3 shrink-0"
          >
            <defs>
              <linearGradient id={arrowGradientId} x1="0" y1="1" x2="0" y2="0">
                <stop stopColor="#FEFE00" />
                <stop offset="1" stopColor="#CF4F00" />
              </linearGradient>
            </defs>
          </Play>
        </span>
      </div>

      <div className="relative mx-auto mt-8 flex items-center gap-x-2.5 px-1">
        <div className="flex flex-col w-full h-20 items-center justify-center gap-1.5 rounded-2xl border-[0.5px] border-[#484B51] bg-[rgba(29,29,29,0.4)]">
          <span className="text-lg font-semibold opacity-80">+$300M</span>
          <span className="max-w-25 text-center text-xs text-[#A0A3A7]">
            Total tokenized Value(TLV)
          </span>
        </div>
        <div className="gradient-border flex flex-col w-32.5 shrink-0 h-24 items-center justify-center gap-1.5 rounded-2xl bg-[rgba(29,29,29,0.4)]">
          <span className="bg-linear-to-r from-[#fefe00] to-[#cf4f00] bg-clip-text text-xl font-semibold text-transparent">
            +$300M
          </span>
          <span className="max-w-25 text-center text-xs text-[#A0A3A7]">
            Total Value Locked(TVL)
          </span>
        </div>
        <div className="flex flex-col w-full h-20 items-center justify-center gap-1.5 rounded-2xl border-[0.5px] border-[#484B51] bg-[rgba(29,29,29,0.4)]">
          <span className="text-lg font-semibold opacity-80">16+</span>
          <span className="max-w-25 text-center text-xs text-[#A0A3A7]">
            Tokenized in
          </span>
        </div>
      </div>
    </div>
  )
}
