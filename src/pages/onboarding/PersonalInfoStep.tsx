import { useState } from 'react'
import { useNavigate } from 'react-router'
import { revalidateLogic, useForm, type AnyFieldApi } from '@tanstack/react-form'
import { ImageUploadSlot } from '@/components/common/ImageUploadSlot.tsx'
import { FieldError } from '@/components/form/FieldError.tsx'
import { FieldLabel } from '@/components/form/FieldLabel.tsx'
import { TextField } from '@/components/form/TextField.tsx'
import { getFieldError } from '@/utils/form.ts'
import { useSavePersonalInfo } from './kycMutations.ts'
import {
  ACCEPTED_IMAGE_TYPES,
  emptyPersonalInfo,
  personalInfoSchema,
} from './schemas.ts'
import { StepCard } from './StepCard.tsx'
import { useKycDraftStore } from './useKycDraftStore.ts'

function IdPhotoField({ field, label }: { field: AnyFieldApi; label: string }) {
  const error = getFieldError(field)
  const errorId = `${field.name}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <ImageUploadSlot
        id={field.name}
        label={label}
        file={field.state.value}
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        invalid={Boolean(error)}
        describedBy={error ? errorId : undefined}
        onChange={field.handleChange}
        onBlur={field.handleBlur}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}

export function PersonalInfoStep() {
  const navigate = useNavigate()
  const savePersonalInfo = useSavePersonalInfo()
  const [defaultValues] = useState(
    () => useKycDraftStore.getState().personalInfo ?? emptyPersonalInfo,
  )
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: personalInfoSchema },
    onSubmit: ({ value }) => {
      savePersonalInfo.mutate(value, {
        onSuccess: () => navigate('/onboarding/documents'),
      })
    },
  })

  return (
    <StepCard title="Personal information">
      <form
        noValidate
        className="flex flex-col items-stretch mt-5 gap-6"
        autoComplete="off"
        spellCheck={false}
        onSubmit={(event) => {
          event.preventDefault()
          void form.handleSubmit()
        }}
      >
        <div className="grid grid-cols-2 gap-2.5">
          <form.Field name="firstName">
            {(field) => (
              <TextField
                field={field}
                label="First name"
                placeholder="First name"
              />
            )}
          </form.Field>
          <form.Field name="lastName">
            {(field) => (
              <TextField
                field={field}
                label="Last name"
                placeholder="Last name"
              />
            )}
          </form.Field>
        </div>
        <form.Field name="email">
          {(field) => (
            <TextField
              field={field}
              type="email"
              label="Email"
              placeholder="Enter Email"
            />
          )}
        </form.Field>
        <div
          role="group"
          aria-labelledby="idPhoto-label"
          className="flex flex-col gap-3.5"
        >
          <FieldLabel id="idPhoto-label">Upload ID photo</FieldLabel>
          <div className="grid grid-cols-2 gap-2.5">
            <form.Field name="idPhotoFront">
              {(field) => <IdPhotoField field={field} label="证件正面" />}
            </form.Field>
            <form.Field name="idPhotoBack">
              {(field) => <IdPhotoField field={field} label="证件反面" />}
            </form.Field>
          </div>
        </div>
        <button
          type="submit"
          disabled={savePersonalInfo.isPending}
          className="cursor-pointer w-full h-12 rounded-2xl bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-[#090E11] text-base font-semibold disabled:opacity-60"
        >
          下一步
        </button>
      </form>
    </StepCard>
  )
}
