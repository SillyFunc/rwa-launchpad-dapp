import { ChevronRight } from 'lucide-react'
import { Button } from 'tdesign-mobile-react'
import debtIcon from '@/assets/launch/debt.svg'
import equityIcon from '@/assets/launch/equity.svg'
import incomeIcon from '@/assets/launch/income.svg'
import realEstateIcon from '@/assets/launch/real-estate.svg'
import { PageTitle } from '@/components/common/PageTitle.tsx'

const assetTypes = [
  {
    value: 'real-estate',
    label: 'Real estate assets',
    icon: realEstateIcon,
    disabled: false,
  },
  {
    value: 'equity',
    label: 'Equity digital assets',
    icon: equityIcon,
    disabled: true,
  },
  {
    value: 'debt',
    label: 'Debt digital assets',
    icon: debtIcon,
    disabled: true,
  },
  {
    value: 'income',
    label: 'Income digital assets',
    icon: incomeIcon,
    disabled: true,
  },
]

export const LaunchPage = () => {
  return (
    <div className="px-4 py-4">
      <PageTitle title="Launch" />
      <section
        aria-labelledby="launch-heading"
        className="gradient-border mt-5 flex flex-col items-center rounded-3xl bg-linear-to-br from-[#4A5F73]/25 to-[#24313F]/25 px-4 py-6"
      >
        <h2
          id="launch-heading"
          className="max-w-2xs bg-linear-to-br from-[#EEEEEE] to-[#FCD438] bg-clip-text text-center text-xl leading-tight font-semibold text-transparent"
        >
          Start building your RWA digital asset
        </h2>
        <p className="mt-2 text-center text-xs leading-tight text-white">
          Need funds? Want to share in the profits? Choose the digital asset
          that meets your goals
        </p>
        <fieldset className="mt-5 flex w-full min-w-0 flex-col gap-4">
          <legend className="sr-only">Choose your digital asset type</legend>
          {assetTypes.map(({ value, label, icon, disabled }) => (
            <label
              key={value}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border border-[#979797] bg-linear-to-b px-4 py-3.5 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-yellow-400 ${
                disabled
                  ? 'from-[#232734]/40 to-[#2D303A]/40'
                  : 'from-[#232734] to-[#2D303A]'
              }`}
            >
              <input
                type="radio"
                name="assetType"
                value={value}
                defaultChecked={!disabled}
                disabled={disabled}
                className="sr-only"
              />
              <span className="flex size-5 shrink-0 items-center justify-center">
                <img src={icon} alt="" className="shrink-0" />
              </span>
              <span
                className={`min-w-0 flex-1 text-sm leading-5 ${disabled ? 'text-white/40' : 'text-white'}`}
              >
                {label}
              </span>
              <ChevronRight
                aria-hidden
                className="size-4 shrink-0 text-[#FCD438]"
                strokeWidth={1.5}
              />
            </label>
          ))}
        </fieldset>
        <Button
          block
          type="button"
          theme="primary"
          shape="round"
          size="large"
          className="mt-6 bg-linear-to-r! from-[#FEFE00] to-[#CF4F00] [--td-button-border-width:0] focus-visible:outline-2! focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
        >
          <span className="text-base font-semibold">Next</span>
        </Button>
      </section>
    </div>
  )
}
