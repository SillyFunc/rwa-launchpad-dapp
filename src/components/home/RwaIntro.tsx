import { Link } from 'react-router'
import checkIcon from '@/assets/home/check.svg'
import ctaArrow from '@/assets/home/cta-arrow.svg'
import heroRing1 from '@/assets/home/hero-ring-1.svg'
import heroRing2 from '@/assets/home/hero-ring-2.svg'
import heroRing3 from '@/assets/home/hero-ring-3.svg'
import heroVisual from '@/assets/home/hero-visual.png'
import { SectionHeading } from './SectionHeading.tsx'

const featureColumns = [
  ['Fully compliant', 'Integrated KYC/KYB'],
  ['No-code', 'Easy onboarding'],
]

export function RwaIntro() {
  return (
    <section className="relative mt-9">
      <SectionHeading title="Whotel RWA" underlineClassName="w-35">
        <p className="mt-2.25 text-xs tracking-widest text-white opacity-60">
          Professional asset tokenization solution
        </p>
      </SectionHeading>

      <div className="relative mx-auto mt-6.5 w-85.75">
        <h1 className="w-70.75 bg-linear-159 from-white from-5% to-[#fcd900] bg-clip-text text-2xl leading-8 font-bold text-transparent">
          Tokenize，trade，and manage any financial instrument
        </h1>
        <p className="mt-3 w-60 text-sm leading-4.5 text-white opacity-80">
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
          className="relative mt-5 flex h-12.75 w-35.75 items-center justify-center gap-0.75 rounded-full text-base font-medium text-[#090e11]"
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
          className="pointer-events-none absolute -top-2.75 left-49.75 size-59.25"
        >
          <img
            alt=""
            src={heroRing1}
            className="absolute inset-0 size-full opacity-5"
          />
          <img
            alt=""
            src={heroRing2}
            className="absolute top-7.5 left-7.5 opacity-5"
          />
          <img
            alt=""
            src={heroRing3}
            className="absolute top-14.5 left-14.5 opacity-5"
          />
          <div className="absolute top-9.5 left-0 h-40.25 w-39.75 overflow-hidden opacity-60">
            <img
              alt=""
              src={heroVisual}
              className="absolute top-0 left-0 h-full w-3/2 max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
