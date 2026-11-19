import { skipToken, useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router'
import { Avatar, Button, Empty, Loading, Toast } from 'tdesign-mobile-react'

import { getRwaProjectDetail, type RwaOverviewInfo } from '@/api/projects.ts'
import { ProjectDescriptionPreview } from '@/components/projects/ProjectDescriptionPreview.tsx'
import {
  ProjectInfoTabs,
  type ProjectInfoTab,
} from '@/components/projects/ProjectInfoTabs.tsx'
import type { ProjectOverviewContent } from '@/components/projects/ProjectOverviewPanel.tsx'
import { m } from '@/paraglide/messages.js'
import { formatAmount, formatDateTime } from '@/utils/format.ts'
import {
  formatTokenSymbol,
  getProjectDescription,
  PROJECT_DESCRIPTION_SECTION_ID,
} from '@/utils/projects.ts'

function formatSaleAmount(value: number | null | undefined, unit?: string) {
  if (value == null) return '--'
  const amount = formatAmount(value)
  return unit ? `${amount} ${unit}` : amount
}

function toOverviewContent(
  info: RwaOverviewInfo | null | undefined,
): ProjectOverviewContent {
  return {
    description: info?.description ?? '',
    items: info?.childs?.filter((item) => item.trim()) ?? [],
  }
}

function scrollToDescription(
  section: HTMLElement | null,
  reduceMotion: boolean | null,
) {
  section?.scrollIntoView({
    behavior: reduceMotion ? 'instant' : 'smooth',
    block: 'start',
  })
  section
    ?.querySelector<HTMLButtonElement>('[role="tab"]')
    ?.focus({ preventScroll: true })
}

export function ProjectDetailPage() {
  const [activeInfoTab, setActiveInfoTab] =
    useState<ProjectInfoTab>('description')
  const infoTabsRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const { id } = useParams<{ id: string }>()
  const projectId = Number(id)
  const isValidId = Number.isSafeInteger(projectId) && projectId > 0

  const project = useQuery({
    queryKey: ['rwaProjectDetail', projectId],
    queryFn: isValidId
      ? ({ signal }) => getRwaProjectDetail(projectId, signal)
      : skipToken,
  })
  const loadedProjectId = project.data?.id

  useEffect(() => {
    if (
      location.hash !== `#${PROJECT_DESCRIPTION_SECTION_ID}` ||
      loadedProjectId !== projectId
    )
      return

    const frame = requestAnimationFrame(() => {
      setActiveInfoTab('description')
      scrollToDescription(infoTabsRef.current, shouldReduceMotion)
    })
    return () => cancelAnimationFrame(frame)
  }, [
    location.hash,
    location.key,
    loadedProjectId,
    projectId,
    shouldReduceMotion,
  ])

  if (!isValidId) return <Navigate to="/projectList" replace />

  if (project.isPending) {
    return (
      <div role="status" className="flex justify-center px-3 py-20">
        <Loading text={m.project_detail_loading()} />
      </div>
    )
  }

  if (project.isError && !project.data) {
    return (
      <Empty
        className="py-20"
        description={m.project_detail_load_failed()}
        action={
          <Button
            shape="round"
            variant="outline"
            onClick={() => project.refetch()}
          >
            {m.retry()}
          </Button>
        }
      />
    )
  }

  if (!project.data) {
    return <Empty className="py-20" description={m.project_detail_empty()} />
  }

  const asset = project.data
  const tokenSymbol = formatTokenSymbol(asset.symbol)
  const avatarFallback = asset.name.slice(0, 1) || '?'
  const description = getProjectDescription(asset)
  const saleDetails = [
    {
      label: m.project_price_per_token,
      value: formatSaleAmount(asset.issuePrice, 'USDC'),
    },
    {
      label: m.project_private_sale_allocation,
      value: formatSaleAmount(asset.maxBuyPerWallet, tokenSymbol),
    },
    {
      label: m.project_total_raise,
      value: formatSaleAmount(asset.totalRaise, 'USDC'),
    },
    {
      label: m.project_total_supply,
      value: formatSaleAmount(asset.totalSupply, tokenSymbol),
    },
    {
      label: m.project_vesting_info,
      value: asset.vestingInfo?.trim() || '--',
    },
    {
      label: m.project_sale_start,
      value: asset.startTime ? formatDateTime(asset.startTime) : '--',
    },
    {
      label: m.project_sale_end,
      value: asset.endTime ? formatDateTime(asset.endTime) : '--',
    },
    {
      label: m.project_allowed_tiers,
      value: asset.allowedTiers?.trim() || '--',
    },
    {
      label: m.project_min_investment,
      value: formatSaleAmount(asset.miniInvestment, 'USDC'),
    },
    {
      label: m.project_token_generation,
      value: asset.tokenGeneration?.trim() || '--',
    },
  ]
  const utilityContent = toOverviewContent(asset.utilityInfo)
  const businessContent = toOverviewContent(asset.businessInfo)

  function showFullDescription() {
    setActiveInfoTab('description')
    requestAnimationFrame(() => {
      scrollToDescription(infoTabsRef.current, shouldReduceMotion)
    })
  }

  return (
    <div className="px-3 py-5">
      <div className="rounded-3xl border border-[#FCD438] bg-linear-[40deg] from-[#4A5F73]/40 to-[#24313F]/40 p-3">
        <div className="mb-4">
          <div className="mb-3.75">
            <div className="flex items-center gap-2.5">
              <Avatar
                className="shrink-0"
                size="42px"
                image={asset.coinImg || undefined}
                alt={asset.name}
                imageProps={{ fit: 'cover', error: avatarFallback }}
              >
                {avatarFallback}
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <h2 className="max-w-full min-w-0 truncate text-base font-semibold text-[#FCD438] uppercase">
                  {asset.name}
                </h2>
                <span className="mt-0.5 max-w-full min-w-0 truncate text-xs text-[#A0A3A7] uppercase">
                  {tokenSymbol}
                </span>
              </div>
            </div>
          </div>
          <ProjectDescriptionPreview description={description}>
            <button
              type="button"
              aria-label={m.project_read_full_description()}
              aria-controls={PROJECT_DESCRIPTION_SECTION_ID}
              onClick={showFullDescription}
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#FCD438] hover:bg-[#FCD438]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCD438]"
            >
              <ChevronDown aria-hidden className="size-4" />
            </button>
          </ProjectDescriptionPreview>
          <div className="flex gap-2.5"></div>
        </div>
        <dl className="mb-4 divide-y divide-[#D8D8D8]/40 rounded-3xl bg-[#212018] p-3">
          {saleDetails.map(({ label, value }) => (
            <div
              key={label()}
              className="flex items-start justify-between gap-3 py-2.5 text-xs first:pt-0 last:pb-0"
            >
              <dt className="min-w-0 flex-1 text-[#A0A3A7]">{label()}</dt>
              <dd className="min-w-0 flex-1 text-right wrap-break-word whitespace-pre-line text-white tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => Toast(m.coming_soon())}
          className="h-10.75 w-full cursor-pointer rounded-full bg-linear-to-r from-[#FEFE00] to-[#CF4F00] uppercase"
        >
          <span className="min-w-0 truncate text-base font-semibold text-[#090E11]">
            {m.project_mint()}
          </span>
        </button>
      </div>
      <ProjectInfoTabs
        id={PROJECT_DESCRIPTION_SECTION_ID}
        ref={infoTabsRef}
        value={activeInfoTab}
        onChange={setActiveInfoTab}
        description={description}
        tokenomics={asset.tokenomicsInfo}
        utility={utilityContent}
        business={businessContent}
      />
    </div>
  )
}
