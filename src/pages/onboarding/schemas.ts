import { z } from 'zod'

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE_MB = 5

export const ATTACHMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
export const MAX_ATTACHMENTS = 5
export const MAX_ATTACHMENT_SIZE_MB = 10

const idPhotoSchema = z
  .file()
  .mime(ACCEPTED_IMAGE_TYPES, 'Only JPG, PNG or WebP images are allowed')
  .max(
    MAX_IMAGE_SIZE_MB * 1024 * 1024,
    `Image must be ${MAX_IMAGE_SIZE_MB} MB or smaller`,
  )
  .nullable()
  .refine((file) => file !== null, 'Please upload this photo')

// 文件规则写在数组层面，错误才会落到字段本身而不是 `field[0]` 这类子路径上
const attachmentsSchema = z
  .array(z.file())
  .min(1, 'Please upload at least one file')
  .max(MAX_ATTACHMENTS, `Upload up to ${MAX_ATTACHMENTS} files`)
  .refine(
    (files) => files.every((file) => ATTACHMENT_TYPES.includes(file.type)),
    'Only PDF, JPEG or PNG files are allowed',
  )
  .refine(
    (files) =>
      files.every((file) => file.size <= MAX_ATTACHMENT_SIZE_MB * 1024 * 1024),
    `Each file must be ${MAX_ATTACHMENT_SIZE_MB} MB or smaller`,
  )

export const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1, 'Please enter your first name'),
  lastName: z.string().trim().min(1, 'Please enter your last name'),
  email: z.string().trim().pipe(z.email('Please enter a valid email')),
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
