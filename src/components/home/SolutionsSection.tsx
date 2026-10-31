import contractIcon from '@/assets/home/icon-contract.svg'
import customerIcon from '@/assets/home/icon-customer.svg'
import infraIcon from '@/assets/home/icon-infra.svg'
import paymentIcon from '@/assets/home/icon-payment.svg'
import { SectionHeading } from './SectionHeading.tsx'

type Solution = {
  title: string
  description: string
  icon: string
}

const solutions: Solution[] = [
  {
    title: 'Customized infrastructure',
    description: 'Fully branded investment platform.',
    icon: infraIcon,
  },
  {
    title: 'Customer Management',
    description:
      'Support for KYC/AML process ensuring smooth and compliant onboarding.',
    icon: customerIcon,
  },
  {
    title: 'Smart Contracts',
    description:
      'Facilitates transactions, ensuring the safety of funds with escrow accounts before investment.',
    icon: contractIcon,
  },
  {
    title: 'Comprehensive Payment',
    description:
      'Our technology enables the issuance of security tokens and record keeping on the blockchain, providing complete transparency.',
    icon: paymentIcon,
  },
]

const cornerDotPositions = ['left-4', 'right-4']

function SolutionCard({ title, description, icon }: Solution) {
  return (
    <article className="relative w-full overflow-hidden rounded-4xl bg-linear-160 from-[#232325] via-[#171718] via-45% to-[#0d0d0e] opacity-90">
      {cornerDotPositions.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`pointer-events-none absolute top-4 size-3 rounded-full border border-[#2e2e30] bg-[#0f0f10] ${position}`}
        />
      ))}
      <div className="relative flex h-full flex-col items-center px-6 pt-10 pb-6">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-black">
          <img alt="" src={icon} />
        </span>
        <h3 className="mt-3 text-center text-sm leading-4.25 font-medium tracking-wider">
          {title}
        </h3>
        <p className="mt-2.5 text-center text-xs text-white opacity-60">
          {description}
        </p>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-4xl border-3 border-[#222]"
      />
    </article>
  )
}

export function SolutionsSection() {
  return (
    <section className="relative mt-13 px-3">
      <SectionHeading title="Professional solutions">
        <p className="mt-2.25 text-xs tracking-widest text-white opacity-60">
          Professional asset tokenization solution
        </p>
      </SectionHeading>
      <div className="mt-4 grid grid-cols-1 gap-x-7.5 gap-y-6">
        {solutions.map((solution) => (
          <SolutionCard key={solution.title} {...solution} />
        ))}
      </div>
    </section>
  )
}
