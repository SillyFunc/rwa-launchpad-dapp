import { useId } from 'react'
import { Play } from 'lucide-react'
import banner from '@/assets/home/banner.png'
import noticeBar from '@/assets/home/notice-bar.svg?url'
import noticeLabel from '@/assets/home/notice-label.svg'

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

      <div
        style={{ backgroundImage: `url(${noticeBar})` }}
        className="relative mt-8 flex w-full h-7.25 items-center pr-2.5 bg-no-repeat"
      >
        <div className="relative flex h-full w-21.75 shrink-0 items-center gap-1.25 pl-2.5">
          <img
            alt=""
            src={noticeLabel}
            className="absolute inset-0 size-full"
          />
          <span className="relative text-sm font-bold text-[#090e11]">
            通知公告
          </span>
          <span className="relative flex h-2 w-1.5 items-center justify-center">
            <Play
              aria-hidden
              strokeWidth={0}
              className="size-2.5 shrink-0 fill-[#090e11]"
            />
          </span>
        </div>
        <p className="relative ml-1.5 min-w-0 flex-1 truncate text-xs font-medium text-white">
          Redefining access, liquidity, and transparency in real-world asset
          tokenization
        </p>
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
        <div className="relative flex flex-col w-32.5 shrink-0 h-24 items-center justify-center gap-1.5 rounded-2xl bg-[rgba(29,29,29,0.4)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[0.5px] before:bg-linear-to-r before:from-[#fefe00]/60 before:to-[#cf4f00]/60 before:[mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude]">
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
