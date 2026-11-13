import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'motion/react'
import { useId, useState, type KeyboardEvent } from 'react'

import { m } from '@/paraglide/messages.js'

import {
  ProjectOverviewPanel,
  type ProjectOverviewContent,
} from './ProjectOverviewPanel.tsx'
import { ProjectTokenomicsPanel } from './ProjectTokenomicsPanel.tsx'

const tabs = [
  { id: 'description', label: m.project_tab_description },
  { id: 'tokenomics', label: m.project_tab_tokenomics },
  { id: 'utility', label: m.project_tab_utility },
  { id: 'business', label: m.project_tab_business },
] as const

type ProjectInfoTab = (typeof tabs)[number]['id']

export function ProjectInfoTabs({
  description,
  utility,
  business,
}: {
  description?: string
  utility?: ProjectOverviewContent
  business?: ProjectOverviewContent
}) {
  const [activeTab, setActiveTab] = useState<ProjectInfoTab>('description')
  const id = useId()
  const shouldReduceMotion = useReducedMotion()
  const pillTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, duration: 0.35, bounce: 0 }
  const contentTransition = { duration: shouldReduceMotion ? 0 : 0.15 }

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const nextIndexByKey: Partial<Record<string, number>> = {
      ArrowLeft: (index + tabs.length - 1) % tabs.length,
      ArrowRight: (index + 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }
    const nextIndex = nextIndexByKey[event.key]
    if (typeof nextIndex !== 'number') return

    event.preventDefault()
    const nextTab = tabs[nextIndex].id
    setActiveTab(nextTab)
    document.getElementById(`${id}-tab-${nextTab}`)?.focus()
  }

  return (
    <section className="mx-1 mt-6">
      <LayoutGroup id={id}>
        <motion.div
          layoutScroll
          role="tablist"
          aria-label={m.project_info_tabs_label()}
          className="flex items-center gap-3 overflow-x-auto"
        >
          {tabs.map((tab, index) => {
            const selected = tab.id === activeTab

            return (
              <motion.button
                key={tab.id}
                id={`${id}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                initial={false}
                animate={{
                  backgroundColor: selected ? 'rgba(42, 42, 42, 0)' : '#2A2A2A',
                  color: selected ? '#FCD438' : 'rgba(255, 255, 255, 0.6)',
                }}
                transition={contentTransition}
                className="relative h-8 flex-1 shrink-0 cursor-pointer rounded-full px-2 text-xs leading-5 whitespace-nowrap focus-visible:outline-none"
              >
                {selected ? (
                  <motion.span
                    aria-hidden
                    layoutId="selected-tab"
                    transition={pillTransition}
                    className="pointer-events-none absolute inset-0 rounded-full border border-[#FCD438] bg-[#FCD438]/10"
                  />
                ) : null}
                <span
                  className={selected ? 'relative font-medium' : 'relative'}
                >
                  {tab.label()}
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      </LayoutGroup>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${activeTab}`}
        tabIndex={0}
        className="mt-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCD438]"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={contentTransition}
            className="min-h-4"
          >
            {activeTab === 'utility' ? (
              <ProjectOverviewPanel
                title={m.project_utility_description()}
                emptyDescription={m.project_utility_empty()}
                content={utility}
              />
            ) : activeTab === 'business' ? (
              <ProjectOverviewPanel
                title={m.project_business_description()}
                emptyDescription={m.project_business_empty()}
                content={business}
              />
            ) : activeTab === 'tokenomics' ? (
              <ProjectTokenomicsPanel />
            ) : (
              <div className="rounded-3xl border border-[#F0E510]/40 bg-linear-to-br from-[#4A5F73]/24 to-[#24313F]/24 p-4">
                <div className="min-h-4">
                  <p className="text-xs leading-tight wrap-break-word whitespace-pre-line text-white/60">
                    {description || m.project_description_empty()}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
