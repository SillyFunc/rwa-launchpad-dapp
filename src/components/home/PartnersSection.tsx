import logo227 from '@/assets/home/partners/logo-227.png'
import logo228 from '@/assets/home/partners/logo-228.png'
import logo229 from '@/assets/home/partners/logo-229.png'
import logo230 from '@/assets/home/partners/logo-230.png'
import logo231 from '@/assets/home/partners/logo-231.png'
import logo232 from '@/assets/home/partners/logo-232.png'
import logo233 from '@/assets/home/partners/logo-233.png'
import logo234 from '@/assets/home/partners/logo-234.png'
import logo235 from '@/assets/home/partners/logo-235.png'
import logo236 from '@/assets/home/partners/logo-236.png'
import logo238 from '@/assets/home/partners/logo-238.png'
import logo239 from '@/assets/home/partners/logo-239.png'
import logo240 from '@/assets/home/partners/logo-240.png'
import logo241 from '@/assets/home/partners/logo-241.png'
import logo242 from '@/assets/home/partners/logo-242.png'
import logo243 from '@/assets/home/partners/logo-243.png'
import logo244 from '@/assets/home/partners/logo-244.png'
import logo245 from '@/assets/home/partners/logo-245.png'
import logo246 from '@/assets/home/partners/logo-246.png'
import { SectionHeading } from './SectionHeading.tsx'

const partnerRows = [
  {
    gapClassName: 'gap-19.75',
    heightClassName: 'h-12.25',
    logos: [
      { src: logo227, widthClassName: 'w-39.25' },
      { src: logo228, widthClassName: 'w-32.5' },
      { src: logo229, widthClassName: 'w-31' },
      { src: logo230, widthClassName: 'w-48' },
      { src: logo231, widthClassName: 'w-23.75' },
      { src: logo232, widthClassName: 'w-27.25' },
    ],
  },
  {
    gapClassName: 'gap-13.5',
    heightClassName: 'h-12.25',
    logos: [
      { src: logo233, widthClassName: 'w-15' },
      { src: logo234, widthClassName: 'w-39.25' },
      { src: logo235, widthClassName: 'w-35' },
      { src: logo236, widthClassName: 'w-42.25' },
      { src: logo238, widthClassName: 'w-34.75' },
      { src: logo239, widthClassName: 'w-21' },
      { src: logo240, widthClassName: 'w-32.25' },
    ],
  },
  {
    gapClassName: 'gap-15.75',
    heightClassName: 'h-12',
    logos: [
      { src: logo241, widthClassName: 'w-43.25' },
      { src: logo242, widthClassName: 'w-34.75' },
      { src: logo243, widthClassName: 'w-32' },
      { src: logo244, widthClassName: 'w-32.25' },
      { src: logo245, widthClassName: 'w-38.75' },
      { src: logo246, widthClassName: 'w-40.25' },
    ],
  },
]

export function PartnersSection() {
  return (
    <section className="relative -mt-0.5">
      <SectionHeading title="Partners" />
      <div className="mt-11 flex flex-col gap-6">
        {partnerRows.map((row, index) => (
          <div
            key={index}
            className={`relative left-1/2 -translate-x-133.5 flex w-max items-center ${row.gapClassName} ${row.heightClassName}`}
          >
            {row.logos.map((logo) => (
              <img
                key={logo.src}
                alt=""
                src={logo.src}
                className={`h-full shrink-0 ${logo.widthClassName}`}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
