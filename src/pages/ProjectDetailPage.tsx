export const ProjectDetailPage = () => {
  return (
    <div className="px-3 py-5">
      <div className="border border-[#FCD438] rounded-3xl p-3 bg-linear-[40deg] from-[#4A5F73]/40 to-[#24313F]/40">
        <div className="mb-4">
          <div className="mb-3.75">
            <div className="flex items-center gap-2.5">
              <div className="rounded-full size-10.5 bg-[#FCD438] shrink-0"></div>
              <div className="flex flex-col items-start">
                <h2 className="min-w-0 truncate uppercase text-[#FCD438] text-base font-semibold">
                  STARDIRE
                </h2>
                <span className="min-w-0 truncate uppercase text-[#A0A3A7] text-xs mt-0.5">
                  $STRD
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs wrap-break-word min-w-0 truncate text-[#A0A3A7]">
            多功能 DeFi 工具代币，提供质押、治理和协议费用分享。
          </p>
          <div className="flex gap-2.5"></div>
        </div>
        <div className="bg-[#212018] p-3 rounded-3xl mb-4 divide-y divide-[#D8D8D8]/40">
          <div className="flex items-center justify-between text-xs pb-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">
              Price per token
            </span>
            <span className="min-w-0 truncate text-white">0.0017 USDC</span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">
              Private Sale Allocation
            </span>
            <span className="min-w-0 truncate text-white">
              56,000,000 $STRD
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">Total raise</span>
            <span className="min-w-0 truncate text-white">95,200 USDC</span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">
              Total Supply
            </span>
            <span className="min-w-0 truncate text-white">
              100,000,000 $STRD
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">
              Vesting information
            </span>
            <span className="min-w-0 truncate text-white">
              10% TGE, 2M Cliff, 10M Vesting
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">Sale Start</span>
            <span className="min-w-0 truncate text-white">
              2025-08-20 18:00
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">Sale End</span>
            <span className="min-w-0 truncate text-white">
              2025-08-20 18:00
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">
              Allowed tiers
            </span>
            <span className="min-w-0 truncate text-white">
              Gole,Platinum,Diamond
            </span>
          </div>
          <div className="flex items-center justify-between text-xs py-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">
              Mini investment
            </span>
            <span className="min-w-0 truncate text-white">100.00 USDC</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-2.5">
            <span className="min-w-0 truncate text-[#A0A3A7]">
              Token Generation
            </span>
            <span className="min-w-0 truncate text-white">TBD</span>
          </div>
        </div>
        <button
          type="button"
          className="uppercase rounded-full h-10.75 bg-linear-to-r from-[#FEFE00] to-[#CF4F00] w-full cursor-pointer"
        >
          <span className="text-base text-[#090E11] font-semibold min-w-0 truncate">
            Casting
          </span>
        </button>
      </div>
    </div>
  )
}
