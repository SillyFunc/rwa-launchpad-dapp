import industryCore from '@/assets/home/industry-core.png'
import { IndustryOrbit } from './IndustryOrbit.tsx'
import { RippleRings } from './RippleRings.tsx'
import { SectionHeading } from './SectionHeading.tsx'

export function IndustrySection() {
  return (
    <section className="relative mt-13 px-3">
      <SectionHeading title="Industry">
        <p className="mt-2.25 text-center text-xs leading-4 text-white opacity-60">
          Explore how businesses across different industries are using RWA to
          improve efficiency, increase accessibility, and unlock new
          opportunities.
        </p>
      </SectionHeading>

      <div className="relative mx-auto mt-8.5 size-85.75">
        <RippleRings
          size={343}
          innerRadius={31.5}
          className="absolute inset-0 size-full"
        />
        <div className="absolute top-29 left-29.75 h-27.5 w-26.25 overflow-hidden rounded-full">
          <img
            alt="WHX"
            src={industryCore}
            className="absolute -top-33 -left-90.25 h-91.5 w-137.5 max-w-none"
          />
        </div>
        <IndustryOrbit />
      </div>
    </section>
  )
}
