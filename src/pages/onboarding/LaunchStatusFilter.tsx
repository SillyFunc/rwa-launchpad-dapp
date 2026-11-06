import { useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'

import { m } from '@/paraglide/messages.js'

const filters = [
  { id: 'all', label: m.onboarding_launch_filter_all },
  { id: 'reviewing', label: m.onboarding_launch_filter_reviewing },
  { id: 'failed', label: m.onboarding_launch_filter_failed },
  { id: 'pending', label: m.onboarding_launch_filter_pending },
  { id: 'issued', label: m.onboarding_launch_filter_issued },
] as const

export type LaunchStatusFilterValue = (typeof filters)[number]['id']

export function LaunchStatusFilter() {
  const [value, setValue] = useState<LaunchStatusFilterValue>('all')
  const scrollerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  function select(next: LaunchStatusFilterValue, button: HTMLButtonElement) {
    setValue(next)
    const container = scrollerRef.current
    if (!container) return
    const left =
      button.offsetLeft - (container.clientWidth - button.offsetWidth) / 2
    container.scrollTo({
      left: Math.max(0, left),
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <div
      ref={scrollerRef}
      role="radiogroup"
      aria-label={m.onboarding_launch_filter_label()}
      className="mt-5 flex [scrollbar-width:none] gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
    >
      {filters.map((filter) => {
        const selected = filter.id === value
        return (
          <button
            key={filter.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={(event) => select(filter.id, event.currentTarget)}
            className={`h-8 shrink-0 cursor-pointer rounded-full px-4 text-xs whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 ${
              selected
                ? 'gradient-border bg-linear-to-r from-[#FEFE00]/10 to-[#CF4F00]/10'
                : 'bg-[#1D1D1D] text-white'
            }`}
          >
            {selected ? (
              <span className="bg-linear-to-r from-[#FEFE00] to-[#CF4F00] bg-clip-text font-medium text-transparent">
                {filter.label()}
              </span>
            ) : (
              filter.label()
            )}
          </button>
        )
      })}
    </div>
  )
}
