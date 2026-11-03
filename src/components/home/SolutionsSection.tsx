import contractIcon from '@/assets/home/icon-contract.svg'
import customerIcon from '@/assets/home/icon-customer.svg'
import infraIcon from '@/assets/home/icon-infra.svg'
import paymentIcon from '@/assets/home/icon-payment.svg'
import { m } from '@/paraglide/messages.js'
import { SectionHeading } from './SectionHeading.tsx'

const solutions = [
  {
    id: 'infrastructure',
    title: m.home_solution_infra_title,
    description: m.home_solution_infra_body,
    icon: infraIcon,
  },
  {
    id: 'clients',
    title: m.home_solution_clients_title,
    description: m.home_solution_clients_body,
    icon: customerIcon,
  },
  {
    id: 'contracts',
    title: m.home_solution_contracts_title,
    description: m.home_solution_contracts_body,
    icon: contractIcon,
  },
  {
    id: 'payments',
    title: m.home_solution_payments_title,
    description: m.home_solution_payments_body,
    icon: paymentIcon,
  },
]

const cornerDotPositions = ['left-4', 'right-4']

function SolutionCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: string
}) {
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
      <SectionHeading title={m.home_solutions_title()}>
        <p className="mt-2.25 text-xs tracking-widest text-white opacity-60">
          {m.home_tagline()}
        </p>
      </SectionHeading>
      <div className="mt-4 grid grid-cols-1 gap-x-7.5 gap-y-6">
        {solutions.map((solution) => (
          <SolutionCard
            key={solution.id}
            title={solution.title()}
            description={solution.description()}
            icon={solution.icon}
          />
        ))}
      </div>
    </section>
  )
}
