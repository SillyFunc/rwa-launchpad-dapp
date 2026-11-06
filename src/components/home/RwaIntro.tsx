import { CircleCheck, MousePointer2 } from 'lucide-react'
import { Link } from 'react-router'

import heroVisual from '@/assets/home/hero-visual.png'
import { m } from '@/paraglide/messages.js'

import { RippleRings } from './RippleRings.tsx'
import { SectionHeading } from './SectionHeading.tsx'

const featureColumns = [
  [
    ['compliant', m.home_feature_compliant],
    ['kyc', m.home_feature_kyc],
  ],
  [
    ['no-code', m.home_feature_no_code],
    ['onboarding', m.home_feature_onboarding],
  ],
] as const

export function RwaIntro() {
  return (
    <section className="mt-9">
      <SectionHeading title={m.home_rwa_title()}>
        <p className="mt-2.25 text-xs tracking-widest text-white opacity-60">
          {m.home_tagline()}
        </p>
      </SectionHeading>
      <section className="relative ps-3">
        <div className="relative mx-auto mt-6.5">
          <h1 className="max-w-70 bg-linear-to-r from-white from-5% to-[#fcd900] bg-clip-text text-2xl font-bold text-transparent">
            {m.home_rwa_headline()}
          </h1>
          <p className="mt-3 max-w-60 min-w-0 text-sm font-normal text-[#A0A3A7]">
            {m.home_rwa_body()}
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
                {column.map(([id, feature]) => (
                  <li key={id} className="flex items-center gap-1">
                    <CircleCheck
                      strokeWidth={1.5}
                      className="size-3.75 shrink-0 text-[#FCD438]"
                    />
                    <span className="text-xs text-[#A0A3A7]/95">
                      {feature()}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <Link
            to="/onboarding"
            className="relative mt-5 flex h-10.75 max-w-max items-center justify-center gap-1 rounded-full bg-linear-to-r from-[#FEFE00] to-[#CF4F00] px-6 text-[#1a1a1a]"
          >
            <MousePointer2 className="size-5 shrink-0 text-[#090E11]" />
            <span className="min-w-0 text-sm leading-none font-semibold text-[#090E11] uppercase">
              {m.home_cta_onboarding()}
            </span>
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
