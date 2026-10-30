import { create } from 'zustand'
import type { CompanyDocumentsValues, PersonalInfoValues } from './schemas.ts'

// 草稿含 File 对象且属于个人隐私信息，只保存在内存中，刷新即丢失
type KycDraftState = {
  personalInfo: PersonalInfoValues | null
  companyDocuments: CompanyDocumentsValues | null
  savePersonalInfo: (values: PersonalInfoValues) => void
  saveCompanyDocuments: (values: CompanyDocumentsValues) => void
}

export const useKycDraftStore = create<KycDraftState>((set) => ({
  personalInfo: null,
  companyDocuments: null,
  savePersonalInfo: (personalInfo) => set({ personalInfo }),
  saveCompanyDocuments: (companyDocuments) => set({ companyDocuments }),
}))
