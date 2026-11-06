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
  return (
    <div className="px-3 py-5">
      <div className="rounded-3xl border border-[#FCD438] bg-linear-[40deg] from-[#4A5F73]/40 to-[#24313F]/40 p-3">
        <div className="mb-4">
          <div className="mb-3.75">
            <div className="flex items-center gap-2.5">
              <div className="size-10.5 shrink-0 rounded-full bg-[#FCD438]"></div>
              <div className="flex flex-col items-start">
                <h2 className="min-w-0 truncate text-base font-semibold text-[#FCD438] uppercase">
                  STARDIRE
                </h2>
                <span className="mt-0.5 min-w-0 truncate text-xs text-[#A0A3A7] uppercase">
                  $STRD
                </span>
              </div>
            </div>
          </div>
          <p className="min-w-0 truncate text-xs wrap-break-word text-[#A0A3A7]">
            多功能 DeFi 工具代币，提供质押、治理和协议费用分享。
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
          className="h-10.75 w-full cursor-pointer rounded-full bg-linear-to-r from-[#FEFE00] to-[#CF4F00] uppercase"
        >
          <span className="min-w-0 truncate text-base font-semibold text-[#090E11]">
            {m.project_mint()}
          </span>
        </button>
      </div>
    </div>
  )
}
