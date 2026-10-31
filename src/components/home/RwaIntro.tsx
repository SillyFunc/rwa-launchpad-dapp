import { Link } from 'react-router'
import checkIcon from '@/assets/home/check.svg'
import ctaArrow from '@/assets/home/cta-arrow.svg'
import heroVisual from '@/assets/home/hero-visual.png'
import { RippleRings } from './RippleRings.tsx'
import { SectionHeading } from './SectionHeading.tsx'

const featureColumns = [
  ['Fully compliant', 'Integrated KYC/KYB'],
  ['No-code', 'Easy onboarding'],
]

export function RwaIntro() {
  return (
    <section className="mt-9">
      <SectionHeading title="Whotel RWA">
        <p className="mt-2.25 text-xs tracking-widest text-white opacity-60">
          Professional asset tokenization solution
        </p>
      </SectionHeading>
      <section className="relative ps-3">
        <div className="relative mx-auto mt-6.5">
          <h1 className="bg-linear-to-r from-white from-5% to-[#fcd900] bg-clip-text text-2xl font-bold text-transparent max-w-70">
            Tokenize, trade, and manage any financial instrument
          </h1>
          <p className="mt-3 text-sm font-normal min-w-0 max-w-60 text-[#A0A3A7]">
            Redefining access, liquidity, and transparency in real-world asset
            tokenization
          </p>
          <div className="mt-3 flex">
            {featureColumns.map((column, index) => (
              <ul
                key={index}
                className={
                  index === 0
                    ? 'flex w-38.25 flex-col gap-y-2.5'
                    : 'flex flex-col gap-y-2.5'
                }
              >
                {column.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-1 text-xs text-white opacity-80"
                  >
                    <img alt="" src={checkIcon} />
                    {feature}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <Link
            to="/onboarding"
            className="relative mt-5 flex h-10.5 items-center justify-center gap-0.75 rounded-full text-base font-medium text-[#090e11]"
          >
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-linear-to-r from-[#fccc1f] to-[#efba09] opacity-10"
            />
            <span
              aria-hidden
              className="absolute inset-x-0.75 inset-y-1 rounded-full bg-linear-to-r from-[#fefe00] to-[#cf4f00]"
            />
            <img alt="" src={ctaArrow} className="relative" />
            <span className="relative">To settle in</span>
          </Link>

          <div
            aria-hidden
            className="pointer-events-none absolute -top-2.75 -right-19.5 size-59.25"
          >
            <RippleRings
              size={237}
              color="#D8D8D8"
              className="absolute inset-0 size-full"
            />
            <img
              alt=""
              src={heroVisual}
              className="absolute top-9.5 left-0 h-40.25 w-39.75 opacity-60"
            />
          </div>
        </div>
      </section>
    </section>
  )
}
