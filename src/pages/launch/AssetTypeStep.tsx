import { revalidateLogic, useForm } from '@tanstack/react-form'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from 'tdesign-mobile-react'

import debtIcon from '@/assets/launch/debt.svg'
import equityIcon from '@/assets/launch/equity.svg'
import incomeIcon from '@/assets/launch/income.svg'
import realEstateIcon from '@/assets/launch/real-estate.svg'
import { m } from '@/paraglide/messages.js'

import { useSaveAssetType } from './launchMutations.ts'
import { LaunchStepShell } from './LaunchStepShell.tsx'
import { emptyAssetType, assetTypeSchema, type AssetType } from './schemas.ts'
import { useLaunchDraftStore } from './useLaunchDraftStore.ts'

const options: {
  value: AssetType
  label: () => string
  icon: string
  disabled: boolean
}[] = [
  {
    value: 'real-estate',
    label: m.launch_type_real_estate,
    icon: realEstateIcon,
    disabled: false,
  },
  {
    value: 'equity',
    label: m.launch_type_equity,
    icon: equityIcon,
    disabled: true,
  },
  {
    value: 'debt',
    label: m.launch_type_debt,
    icon: debtIcon,
    disabled: true,
  },
  {
    value: 'income',
    label: m.launch_type_income,
    icon: incomeIcon,
    disabled: true,
  },
]

export function AssetTypeStep() {
  const navigate = useNavigate()
  const saveAssetType = useSaveAssetType()
  const [defaultValues] = useState(
    () => useLaunchDraftStore.getState().assetType ?? emptyAssetType,
  )
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: assetTypeSchema },
    onSubmit: ({ value }) => {
      saveAssetType.mutate(value, {
        onSuccess: () => navigate('/launch/details'),
      })
    },
  })

  return (
    <LaunchStepShell title={m.launch_heading()} description={m.launch_body()}>
      <form
        noValidate
        className="mt-5 flex w-full min-w-0 flex-col"
        onSubmit={(event) => {
          event.preventDefault()
          void form.handleSubmit()
        }}
      >
        <form.Field name="assetType">
          {(field) => (
            <fieldset className="flex w-full min-w-0 flex-col gap-4">
              <legend className="sr-only">{m.launch_type_legend()}</legend>
              {options.map(({ value, label, icon, disabled }) => (
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
                    name={field.name}
                    value={value}
                    checked={field.state.value === value}
                    disabled={disabled}
                    onBlur={field.handleBlur}
                    onChange={() => field.handleChange(value)}
                    className="sr-only"
                  />
                  <span className="flex size-5 shrink-0 items-center justify-center">
                    <img src={icon} alt="" className="shrink-0" />
                  </span>
                  <span
                    className={`min-w-0 flex-1 text-sm leading-5 ${disabled ? 'text-white/40' : 'text-white'}`}
                  >
                    {label()}
                  </span>
                  <ChevronRight
                    aria-hidden
                    className="size-4 shrink-0 text-[#FCD438]"
                    strokeWidth={1.5}
                  />
                </label>
              ))}
            </fieldset>
          )}
        </form.Field>
        <Button
          block
          type="submit"
          theme="primary"
          shape="round"
          size="large"
          disabled={saveAssetType.isPending}
          className="mt-6 bg-linear-to-r! from-[#FEFE00] to-[#CF4F00] [--td-button-border-width:0] focus-visible:outline-2! focus-visible:outline-offset-4 focus-visible:outline-yellow-400"
        >
          <span className="text-base font-semibold">{m.launch_next()}</span>
        </Button>
      </form>
    </LaunchStepShell>
  )
}
