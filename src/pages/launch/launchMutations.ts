import { useMutation } from '@tanstack/react-query'
import type { AssetTypeValues } from './schemas.ts'
import { useLaunchDraftStore } from './useLaunchDraftStore.ts'

export function useSaveAssetType() {
  const saveAssetType = useLaunchDraftStore((state) => state.saveAssetType)

  return useMutation({
    mutationFn: async (values: AssetTypeValues) => {
      saveAssetType(values)
    },
  })
}
