import { useNavigate } from 'react-router'

import rwaAssetsBanner from '@/assets/home/banner-rwa-assets.webp'
import { m } from '@/paraglide/messages.js'

export function ProjectListPage() {
  const navigate = useNavigate()

  return (
    <div className="px-3 py-6">
      <div className="rounded-3xl border border-[#FCD438] bg-[#1D1D1D] p-3">
        <div className="mb-3">
          <div className="relative h-71.25 w-full overflow-hidden rounded-2xl">
            <img
              src={rwaAssetsBanner}
              alt=""
              decoding="async"
              fetchPriority="high"
              className="size-full object-cover"
            />
            <div className="absolute inset-x-5 top-0 flex gap-1.5 text-xs">
              <span className="rounded-br-sm rounded-bl-sm bg-white px-1.5 py-0.75 text-[#FB8B0F]">
                {m.project_tag_private_round()}
              </span>
              <span className="rounded-br-sm rounded-bl-sm bg-[#FCD438] px-1.5 py-0.75 text-[#090E11]">
                {m.project_tag_live()}
              </span>
              <span className="rounded-br-sm rounded-bl-sm bg-[#FB8B0F] px-1.5 py-0.75 text-[#090E11]">
                RWA
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3.75">
          <h2 className="mb-2.5 max-w-max bg-linear-[100deg] from-white to-[#FCD900] bg-clip-text text-2xl leading-none font-bold text-transparent uppercase">
            ETH-ETF
          </h2>
          <p className="mb-3 text-xs leading-relaxed wrap-break-word text-[#A0A3A7]">
            {m.project_total_pool_amount()}
          </p>
          <div className="mb-2.5 flex flex-col">
            <div className="flex items-center justify-between text-base font-semibold text-white tabular-nums">
              <span className="min-w-0 truncate">560000 3W</span>
              <span className="min-w-0 truncate">30%</span>
            </div>
            <div></div>
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A0A3A7]">{m.project_start_in()}</span>
              <span className="text-white tabular-nums">2025.09.30 16:00</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A0A3A7]">{m.project_end_in()}</span>
              <span className="text-white tabular-nums">2025.09.30 16:00</span>
            </div>
          </div>
        </div>
        <div className="rounded-full bg-linear-to-r from-[#FCCC1F]/10 to-[#EFBA09]/10 p-1">
          <button
            type="button"
            aria-label={m.project_see_more_aria()}
            onClick={() => navigate('/projectDetail')}
            className="h-10 w-full cursor-pointer rounded-full bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-base font-semibold text-[#090E11] uppercase"
          >
            {m.project_see_more()}
          </button>
        </div>
      </div>
    </div>
  )
}
