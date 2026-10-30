import { Fragment } from 'react'
import industryCore from '@/assets/home/industry-core.png'
import industryNode from '@/assets/home/industry-node.svg'
import industryIcon1 from '@/assets/home/industry-icon-1.svg'
import industryIcon2 from '@/assets/home/industry-icon-2.svg'
import industryIcon3 from '@/assets/home/industry-icon-3.svg'
import industryIcon4 from '@/assets/home/industry-icon-4.svg'
import industryIcon5 from '@/assets/home/industry-icon-5.svg'
import industryRing from '@/assets/home/industry-ring.svg'
import { SectionHeading } from './SectionHeading.tsx'

const nodes = [
  {
    label: '房地产',
    icon: industryIcon1,
    nodeClassName: 'left-37.5 top-4.25',
    labelClassName: 'left-49.5 top-7',
  },
  {
    label: '金融',
    icon: industryIcon2,
    nodeClassName: 'left-63.25 top-24.5',
    labelClassName: 'left-68.75 top-36.5 -translate-x-1/2',
  },
  {
    label: 'Web3',
    icon: industryIcon3,
    nodeClassName: 'left-54.75 top-61.75',
    labelClassName: 'left-68.5 top-64.5',
  },
  {
    label: '风险投资',
    icon: industryIcon4,
    nodeClassName: 'left-12.25 top-54.25',
    labelClassName: 'left-18.25 top-66.75 -translate-x-1/2',
  },
  {
    label: '娱乐',
    icon: industryIcon5,
    nodeClassName: 'left-12.25 top-17.5',
    labelClassName: 'left-5.25 top-24.25 w-6 text-right',
  },
]

export function IndustrySection() {
  return (
    <section className="relative mt-13 px-4">
      <SectionHeading title="Industry">
        <p className="mt-2.25 text-center text-xs leading-4 text-white opacity-60">
          Explore how businesses across different industries are using RWA to
          improve efficiency, increase accessibility, and unlock new
          opportunities.
        </p>
      </SectionHeading>

      <div className="relative mx-auto mt-8.5 size-85.75">
        <img alt="" src={industryRing} className="absolute inset-0 size-full" />
        <div className="absolute top-29 left-29.75 h-27.5 w-26.25 overflow-hidden rounded-full">
          <img
            alt="WHX"
            src={industryCore}
            className="absolute -top-33 -left-90.25 h-91.5 w-137.5 max-w-none"
          />
        </div>
        {nodes.map((node) => (
          <Fragment key={node.label}>
            <div
              className={`absolute flex size-10.5 items-center justify-center ${node.nodeClassName}`}
            >
              <img
                alt=""
                src={industryNode}
                className="absolute inset-0 size-full"
              />
              <img alt="" src={node.icon} className="relative" />
            </div>
            <span
              className={`absolute text-xs whitespace-nowrap text-white ${node.labelClassName}`}
            >
              {node.label}
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  )
}
