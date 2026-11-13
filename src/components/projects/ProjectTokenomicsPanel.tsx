import { lazy, Suspense } from 'react'
import { Loading } from 'tdesign-mobile-react'

import { m } from '@/paraglide/messages.js'

import type { TokenAllocation } from './TokenDistributionChart.tsx'

const TokenDistributionChart = lazy(
  () => import('./TokenDistributionChart.tsx'),
)

const exampleAllocations = [
  { id: 'seed', label: m.project_allocation_seed, color: '#8F6CFE', value: 32 },
  {
    id: 'private',
    label: m.project_allocation_private,
    color: '#DC5BEF',
    value: 6,
  },
  {
    id: 'public',
    label: m.project_allocation_public,
    color: '#F2547E',
    value: 16,
  },
  {
    id: 'liquidity',
    label: m.project_allocation_liquidity,
    color: '#FF8600',
    value: 16,
  },
  {
    id: 'treasury',
    label: m.project_allocation_treasury,
    color: '#FFD000',
    value: 5,
  },
  {
    id: 'core-team',
    label: m.project_allocation_core_team,
    color: '#8EE017',
    value: 4,
  },
  {
    id: 'advisory',
    label: m.project_allocation_advisory,
    color: '#4AE4D6',
    value: 1,
  },
  {
    id: 'ecosystem',
    label: m.project_allocation_ecosystem,
    color: '#00C0FD',
    value: 1,
  },
  { id: 'kol', label: () => 'KOL', color: '#12A9D2', value: 12 },
  {
    id: 'unlocked',
    label: m.project_allocation_unlocked,
    color: '#4079F4',
    value: 7,
  },
] as const

export function ProjectTokenomicsPanel({
  allocations: providedAllocations,
}: {
  allocations?: readonly TokenAllocation[]
}) {
  const allocations =
    providedAllocations ??
    exampleAllocations.map(({ label, ...allocation }) => ({
      ...allocation,
      name: label(),
    }))

  return (
    <div className="grid min-h-62 grid-cols-5 gap-x-4 rounded-3xl border border-[#F0E510]/40 bg-linear-to-br from-[#4A5F73]/24 to-[#24313F]/24 p-4">
      <figure className="col-span-3 min-w-0">
        <figcaption className="max-w-24 text-xs leading-tight font-semibold text-white">
          {m.project_distribution_breakdown()}
        </figcaption>
        <div className="mt-3 w-full max-w-45">
          <Suspense
            fallback={
              <div
                role="status"
                className="flex aspect-square items-center justify-center"
              >
                <Loading text={m.project_chart_loading()} layout="vertical" />
              </div>
            }
          >
            <TokenDistributionChart allocations={allocations} />
          </Suspense>
        </div>
      </figure>
      <div className="col-span-2 min-w-0">
        <h3 className="max-w-24 text-xs leading-tight font-semibold text-white">
          {m.project_token_distribution()}
        </h3>
        <ul className="mt-3 space-y-1 text-[0.625rem] leading-3 text-white/80">
          {allocations.map((allocation) => (
            <li key={allocation.id} className="flex items-start gap-1.5">
              <span
                aria-hidden
                className="mt-0.5 h-2 w-3.5 shrink-0 border border-white"
                style={{ backgroundColor: allocation.color }}
              />
              <span className="min-w-0 wrap-break-word">{allocation.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
