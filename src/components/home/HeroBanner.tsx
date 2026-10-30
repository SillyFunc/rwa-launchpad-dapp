import { useId } from 'react'
import { Play } from 'lucide-react'
import banner from '@/assets/home/banner.png'
import { NoticeMarquee } from './NoticeMarquee.tsx'

// 占位公告，接入公告接口后替换
const notice =
  'Welcome to Whotel RWA — tokenize, trade, and manage real-world assets across real estate, finance, Web3, venture capital, and entertainment. Redefining access, liquidity, and transparency in real-world asset tokenization, with a fully compliant, no-code platform, integrated KYC/KYB, and easy onboarding. Complete your KYC verification to get started.'

export function HeroBanner() {
  const arrowGradientId = useId()

  return (
    <div className="relative">
      <div className="relative rounded-3xl overflow-hidden w-full h-40">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <img
            fetchPriority="low"
            decoding="async"
            loading="lazy"
            className="object-cover w-full h-full"
            srcSet={banner}
          />
        </a>
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
        <div className="flex flex-col w-full h-20 items-center justify-center gap-1.5 rounded-2xl border-[0.5px] border-white bg-[rgba(29,29,29,0.4)]">
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
        <div className="flex flex-col w-full h-20 items-center justify-center gap-1.5 rounded-2xl border-[0.5px] border-white bg-[rgba(29,29,29,0.4)]">
          <span className="text-lg font-semibold opacity-80">16+</span>
          <span className="max-w-25 text-center text-xs text-[#A0A3A7]">
            Tokenized in
          </span>
        </div>
      </div>
    </div>
  )
}
