import { z } from 'zod'

import { m } from '@/paraglide/messages.js'

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE_MB = 5

export const ATTACHMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
export const MAX_ATTACHMENTS = 5
export const MAX_ATTACHMENT_SIZE_MB = 10

const idPhotoSchema = z
  .file()
  .mime(ACCEPTED_IMAGE_TYPES, {
    error: () => m.kyc_error_photo_type(),
  })
  .max(MAX_IMAGE_SIZE_MB * 1024 * 1024, {
    error: () => m.kyc_error_photo_size({ size: MAX_IMAGE_SIZE_MB }),
  })
  .nullable()
  .refine((file) => file !== null, {
    error: () => m.kyc_error_photo_required(),
  })

// 文件规则写在数组层面，错误才会落到字段本身而不是 `field[0]` 这类子路径上
const attachmentsSchema = z
  .array(z.file())
  .min(1, { error: () => m.kyc_error_file_required() })
  .max(MAX_ATTACHMENTS, {
    error: () => m.kyc_error_file_max({ max: MAX_ATTACHMENTS }),
  })
  .refine(
    (files) => files.every((file) => ATTACHMENT_TYPES.includes(file.type)),
    { error: () => m.kyc_error_file_type() },
  )
  .refine(
    (files) =>
      files.every((file) => file.size <= MAX_ATTACHMENT_SIZE_MB * 1024 * 1024),
    { error: () => m.kyc_error_file_size({ size: MAX_ATTACHMENT_SIZE_MB }) },
  )

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, {
      error: () => m.kyc_error_first_name(),
    }),
  lastName: z
    .string()
    .trim()
    .min(1, {
      error: () => m.kyc_error_last_name(),
    }),
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: () => m.kyc_error_email() })),
  idPhotoFront: idPhotoSchema,
  idPhotoBack: idPhotoSchema,
})

export const companyDocumentsSchema = z.object({
  certificateOfIncorporation: attachmentsSchema,
  articlesOfAssociation: attachmentsSchema,
  shareholderRegister: attachmentsSchema,
  directorRegister: attachmentsSchema,
  organizationChart: attachmentsSchema,
  certificateOfIncumbency: attachmentsSchema,
})

export type PersonalInfoValues = z.input<typeof personalInfoSchema>
export type CompanyDocumentsValues = z.input<typeof companyDocumentsSchema>

export const emptyPersonalInfo: PersonalInfoValues = {
  firstName: '',
  lastName: '',
  email: '',
  idPhotoFront: null,
  idPhotoBack: null,
}

export const emptyCompanyDocuments: CompanyDocumentsValues = {
  certificateOfIncorporation: [],
  articlesOfAssociation: [],
  shareholderRegister: [],
  directorRegister: [],
  organizationChart: [],
  certificateOfIncumbency: [],
}
