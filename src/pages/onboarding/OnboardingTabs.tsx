import type { KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { m } from '@/paraglide/messages.js'

const pillTransition = { type: 'spring' as const, duration: 0.4, bounce: 0 }
const labelTransition = { duration: 0.4, ease: 'easeOut' as const }

const tabs = [
  { id: 'profile', label: m.onboarding_tab_profile },
  { id: 'launches', label: m.onboarding_tab_launches },
] as const

export type OnboardingTab = (typeof tabs)[number]['id']

function adjacentTab(id: OnboardingTab, key: string) {
  const index = tabs.findIndex((tab) => tab.id === id)
  if (key === 'Home') return tabs[0].id
  if (key === 'End') return tabs[tabs.length - 1].id
  if (key === 'ArrowRight') return tabs[index + 1]?.id
  if (key === 'ArrowLeft') return tabs[index - 1]?.id
  return undefined
}

export function OnboardingTabs({
  value,
  onChange,
}: {
  value: OnboardingTab
  onChange: (value: OnboardingTab) => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion ? { duration: 0 } : undefined

  function selectTab(next: OnboardingTab) {
    onChange(next)
    requestAnimationFrame(() => {
      document.getElementById(`onboarding-tab-${next}`)?.focus()
    })
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: OnboardingTab) {
    const next = adjacentTab(id, event.key)
    if (!next || next === id) return
    event.preventDefault()
    selectTab(next)
  }

  return (
    <div className="relative mt-5 h-9">
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl border border-white/40"
      />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/2 rounded-xl bg-linear-to-r from-[#FEFE00] to-[#CF4F00]"
        initial={false}
        animate={{ x: value === 'launches' ? '100%' : '0%' }}
        transition={transition ?? pillTransition}
      />
      <div
        role="tablist"
        aria-label={m.onboarding_tabs_label()}
        className="relative z-10 grid h-full grid-cols-2"
      >
        {tabs.map((tab) => {
          const selected = tab.id === value
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`onboarding-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`onboarding-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => onTabKeyDown(event, tab.id)}
              className="cursor-pointer text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
            >
              <motion.span
                className={selected ? 'font-semibold' : undefined}
                initial={false}
                animate={{
                  color: selected ? '#111111' : 'rgba(255, 255, 255, 0.6)',
                }}
                transition={transition ?? labelTransition}
              >
                {tab.label()}
              </motion.span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
