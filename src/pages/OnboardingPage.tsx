import type { ReactNode } from 'react'
import { revalidateLogic, useForm, type AnyFieldApi } from '@tanstack/react-form'
import { z } from 'zod'
import { ImageUploadSlot } from '@/components/common/ImageUploadSlot.tsx'
import { PageTitle } from '@/components/common/PageTitle.tsx'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE_MB = 5

const idPhotoSchema = z
  .file()
  .mime(ACCEPTED_IMAGE_TYPES, 'Only JPG, PNG or WebP images are allowed')
  .max(
    MAX_IMAGE_SIZE_MB * 1024 * 1024,
    `Image must be ${MAX_IMAGE_SIZE_MB} MB or smaller`,
  )
  .nullable()
  .refine((file) => file !== null, 'Please upload this photo')

const onboardingSchema = z.object({
  firstName: z.string().trim().min(1, 'Please enter your first name'),
  lastName: z.string().trim().min(1, 'Please enter your last name'),
  email: z.string().trim().pipe(z.email('Please enter a valid email')),
  idPhotoFront: idPhotoSchema,
  idPhotoBack: idPhotoSchema,
})

const defaultValues: z.input<typeof onboardingSchema> = {
  firstName: '',
  lastName: '',
  email: '',
  idPhotoFront: null,
  idPhotoBack: null,
}

function getErrorMessage(field: AnyFieldApi): string | undefined {
  return field.state.meta.errors[0]?.message
}

function FieldLabel({
  htmlFor,
  id,
  children,
}: {
  htmlFor?: string
  id?: string
  children: ReactNode
}) {
  return (
    <label
      htmlFor={htmlFor}
      id={id}
      className="text-base font-semibold text-white"
    >
      <span aria-hidden className="text-[#FF0000] mr-1">
        *
      </span>
      {children}
    </label>
  )
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-xs text-[#FF0000]">
      {children}
    </p>
  )
}

function TextField({
  field,
  label,
  placeholder,
  type = 'text',
}: {
  field: AnyFieldApi
  label: string
  placeholder: string
  type?: 'text' | 'email'
}) {
  const error = getErrorMessage(field)
  const errorId = `${field.name}-error`

  return (
    <div className="flex flex-col gap-3.5">
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div className="flex flex-col gap-1.5">
        <input
          id={field.name}
          name={field.name}
          type={type}
          required
          placeholder={placeholder}
          value={field.state.value}
          onChange={(event) => field.handleChange(event.target.value)}
          onBlur={field.handleBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`bg-black/10 rounded-xl border ${error ? 'border-[#FF0000]' : 'border-white/40'} h-10.5 px-4 text-sm placeholder:text-white/40`}
        />
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    </div>
  )
}

function IdPhotoField({ field, label }: { field: AnyFieldApi; label: string }) {
  const error = getErrorMessage(field)
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

export function OnboardingPage() {
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: onboardingSchema },
    onSubmit: () => {
      // TODO: 接入 KYC 提交接口（上传证件照并提交资料）
    },
  })

  return (
    <div className="px-3 py-6">
      <PageTitle title="Registration Verification (KYC)" />
      <section className="bg-[#1a1a1a] p-4 rounded-2xl mt-5 flex flex-col">
        <div className="max-w-max bg-clip-text text-transparent text-xl font-semibold bg-linear-to-r from-[#EEEEEE] to-[#FFC615]">
          Personal information
        </div>
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
            className="cursor-pointer w-full h-12 rounded-2xl bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-[#090E11] text-base font-semibold"
          >
            下一步
          </button>
        </form>
      </section>
    </div>
  )
}
