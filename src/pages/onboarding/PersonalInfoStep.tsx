import {
  revalidateLogic,
  useForm,
  type AnyFieldApi,
} from '@tanstack/react-form'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { ImageUploadSlot } from '@/components/common/ImageUploadSlot.tsx'
import { FieldError } from '@/components/form/FieldError.tsx'
import { FieldLabel } from '@/components/form/FieldLabel.tsx'
import { TextField } from '@/components/form/TextField.tsx'
import { m } from '@/paraglide/messages.js'
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
    <StepCard title={m.kyc_personal_title()}>
      <form
        noValidate
        className="mt-5 flex flex-col items-stretch gap-6"
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
                label={m.kyc_first_name()}
                placeholder={m.kyc_first_name()}
              />
            )}
          </form.Field>
          <form.Field name="lastName">
            {(field) => (
              <TextField
                field={field}
                label={m.kyc_last_name()}
                placeholder={m.kyc_last_name()}
              />
            )}
          </form.Field>
        </div>
        <form.Field name="email">
          {(field) => (
            <TextField
              field={field}
              type="email"
              label={m.kyc_email()}
              placeholder={m.kyc_email_placeholder()}
            />
          )}
        </form.Field>
        <div
          role="group"
          aria-labelledby="idPhoto-label"
          className="flex flex-col gap-3.5"
        >
          <FieldLabel id="idPhoto-label">{m.kyc_id_photo()}</FieldLabel>
          <div className="grid grid-cols-2 gap-2.5">
            <form.Field name="idPhotoFront">
              {(field) => (
                <IdPhotoField field={field} label={m.kyc_id_front()} />
              )}
            </form.Field>
            <form.Field name="idPhotoBack">
              {(field) => (
                <IdPhotoField field={field} label={m.kyc_id_back()} />
              )}
            </form.Field>
          </div>
        </div>
        <button
          type="submit"
          disabled={savePersonalInfo.isPending}
          className="h-12 w-full cursor-pointer rounded-2xl bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-base font-semibold text-[#090E11] uppercase disabled:opacity-60"
        >
          {m.kyc_next()}
        </button>
      </form>
    </StepCard>
  )
}
