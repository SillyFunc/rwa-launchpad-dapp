import { skipToken, useQuery } from '@tanstack/react-query'
import { Navigate, useParams } from 'react-router'
import { Avatar, Button, Empty, Loading, Toast } from 'tdesign-mobile-react'

import { getRwaProjectDetail } from '@/api/projects.ts'
import { ProjectInfoTabs } from '@/components/projects/ProjectInfoTabs.tsx'
import { getLocale } from '@/i18n/locale.ts'
import { m } from '@/paraglide/messages.js'

const saleDetails: { label: () => string; value: string }[] = [
  { label: m.project_price_per_token, value: '0.0017 USDC' },
  { label: m.project_private_sale_allocation, value: '56,000,000 $STRD' },
  { label: m.project_total_raise, value: '95,200 USDC' },
  { label: m.project_total_supply, value: '100,000,000 $STRD' },
  { label: m.project_vesting_info, value: '10% TGE, 2M Cliff, 10M Vesting' },
  { label: m.project_sale_start, value: '2025-08-20 18:00' },
  { label: m.project_sale_end, value: '2025-08-20 18:00' },
  { label: m.project_allowed_tiers, value: 'Gold, Platinum, Diamond' },
  { label: m.project_min_investment, value: '100.00 USDC' },
  { label: m.project_token_generation, value: 'TBD' },
]

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const projectId = Number(id)
  const isValidId = Number.isSafeInteger(projectId) && projectId > 0

  const project = useQuery({
    queryKey: ['rwaProjectDetail', projectId],
    queryFn: isValidId
      ? ({ signal }) => getRwaProjectDetail(projectId, signal)
      : skipToken,
  })

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
  const tokenSymbol = asset.symbol.startsWith('$')
    ? asset.symbol
    : `$${asset.symbol}`
  const avatarFallback = asset.name.slice(0, 1) || '?'
  const description =
    getLocale() === 'zh-Hant'
      ? asset.zhIntroduction?.trim() || asset.enIntroduction?.trim()
      : asset.enIntroduction?.trim() || asset.zhIntroduction?.trim()
  const utilityContent = {
    description: m.project_utility_summary({ symbol: tokenSymbol }),
    items: [
      m.project_utility_item_staking(),
      m.project_utility_item_governance(),
      m.project_utility_item_access(),
      m.project_utility_item_transactions(),
    ],
  }
  const businessContent = {
    description: m.project_business_summary(),
    items: [
      m.project_business_item_tokenization(),
      m.project_business_item_ecosystem(),
      m.project_business_item_community(),
      m.project_business_item_collaboration(),
    ],
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
          <p className="min-w-0 text-xs wrap-break-word whitespace-pre-line text-[#A0A3A7]">
            {description || m.project_description_empty()}
          </p>
          <div className="flex gap-2.5"></div>
        </div>
        <dl className="mb-4 divide-y divide-[#D8D8D8]/40 rounded-3xl bg-[#212018] p-3">
          {saleDetails.map(({ label, value }) => (
            <div
              key={label()}
              className="flex items-center justify-between py-2.5 text-xs first:pt-0 last:pb-0"
            >
              <dt className="min-w-0 truncate text-[#A0A3A7]">{label()}</dt>
              <dd className="min-w-0 truncate text-white tabular-nums">
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
        description={description}
        utility={utilityContent}
        business={businessContent}
      />
    </div>
  )
}
