import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { revalidateLogic, useForm, type AnyFieldApi } from '@tanstack/react-form'
import { AttachmentUpload } from '@/components/form/AttachmentUpload.tsx'
import { FieldError } from '@/components/form/FieldError.tsx'
import { FieldLabel } from '@/components/form/FieldLabel.tsx'
import { getFieldError } from '@/utils/form.ts'
import { useSubmitKyc } from './kycMutations.ts'
import {
  ATTACHMENT_TYPES,
  companyDocumentsSchema,
  emptyCompanyDocuments,
  MAX_ATTACHMENT_SIZE_MB,
  MAX_ATTACHMENTS,
} from './schemas.ts'
import { StepCard } from './StepCard.tsx'
import { useKycDraftStore } from './useKycDraftStore.ts'

const documentFields = [
  { name: 'certificateOfIncorporation', label: 'Certificate of Incorporation' },
  { name: 'articlesOfAssociation', label: 'Articles of Association' },
  { name: 'shareholderRegister', label: 'Shareholder Register' },
  { name: 'directorRegister', label: 'Director Register' },
  { name: 'organizationChart', label: 'Organization Chart' },
  { name: 'certificateOfIncumbency', label: 'Certificate of Incumbency' },
] as const

const attachmentHint = `Supported format: PDF, JPEG, PNG. ${MAX_ATTACHMENTS} files at maximum, each file should not exceed ${MAX_ATTACHMENT_SIZE_MB}MB`

function AttachmentField({
  field,
  label,
}: {
  field: AnyFieldApi
  label: string
}) {
  const error = getFieldError(field)
  const labelId = `${field.name}-label`
  const hintId = `${field.name}-hint`
  const errorId = `${field.name}-error`

  return (
    <div className="flex flex-col gap-3.5">
      <FieldLabel id={labelId}>{label}</FieldLabel>
      <div className="flex flex-col gap-2">
        <AttachmentUpload
          id={field.name}
          labelId={labelId}
          files={field.state.value}
          accept={ATTACHMENT_TYPES.join(',')}
          maxFiles={MAX_ATTACHMENTS}
          invalid={Boolean(error)}
          describedBy={error ? `${hintId} ${errorId}` : hintId}
          onChange={field.handleChange}
          onBlur={field.handleBlur}
        />
        <p id={hintId} className="text-xs text-white/60">
          {attachmentHint}
        </p>
        {error && <FieldError id={errorId}>{error}</FieldError>}
      </div>
    </div>
  )
}

function CompanyDocumentsForm() {
  const navigate = useNavigate()
  const submitKyc = useSubmitKyc()
  const saveCompanyDocuments = useKycDraftStore(
    (state) => state.saveCompanyDocuments,
  )
  const [defaultValues] = useState(
    () => useKycDraftStore.getState().companyDocuments ?? emptyCompanyDocuments,
  )
  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: companyDocumentsSchema },
    // 返回按钮与系统返回手势都会卸载本步，边改边存才不会丢失已选文件
    listeners: {
      onChange: ({ formApi }) => saveCompanyDocuments(formApi.state.values),
    },
    onSubmit: ({ value }) => submitKyc.mutate(value),
  })

  return (
    <StepCard title="Personal information">
      <form
        noValidate
        className="flex flex-col items-stretch mt-5 gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          void form.handleSubmit()
        }}
      >
        {documentFields.map(({ name, label }) => (
          <form.Field key={name} name={name}>
            {(field) => <AttachmentField field={field} label={label} />}
          </form.Field>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer h-12 rounded-full bg-[#6E6E6E] text-base font-semibold text-white"
          >
            Return
          </button>
          <button
            type="submit"
            disabled={submitKyc.isPending}
            className="cursor-pointer h-12 rounded-full bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-base font-semibold text-[#090E11] disabled:opacity-60"
          >
            Submit
          </button>
        </div>
      </form>
    </StepCard>
  )
}

export function CompanyDocumentsStep() {
  const hasPersonalInfo = useKycDraftStore(
    (state) => state.personalInfo !== null,
  )

  if (!hasPersonalInfo) return <Navigate to="/onboarding" replace />
  return <CompanyDocumentsForm />
}
