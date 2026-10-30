import { useMutation } from '@tanstack/react-query'
import type { CompanyDocumentsValues, PersonalInfoValues } from './schemas.ts'
import { useKycDraftStore } from './useKycDraftStore.ts'

export function useSavePersonalInfo() {
  const savePersonalInfo = useKycDraftStore((state) => state.savePersonalInfo)

  return useMutation({
    mutationFn: async (values: PersonalInfoValues) => {
      // TODO: 若后端支持分步保存，在此调用保存接口
      savePersonalInfo(values)
    },
  })
}

export function useSubmitKyc() {
  const saveCompanyDocuments = useKycDraftStore(
    (state) => state.saveCompanyDocuments,
  )

  return useMutation({
    mutationFn: async (values: CompanyDocumentsValues) => {
      saveCompanyDocuments(values)
      // TODO: 接入 KYC 提交接口（一次性提交时需带上草稿中的 personalInfo）
    },
  })
}
