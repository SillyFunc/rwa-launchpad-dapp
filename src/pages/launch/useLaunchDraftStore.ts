import { create } from 'zustand'

import type { AssetTypeValues } from './schemas.ts'

type LaunchDraftState = {
  assetType: AssetTypeValues | null
  saveAssetType: (values: AssetTypeValues) => void
}

export const useLaunchDraftStore = create<LaunchDraftState>((set) => ({
  assetType: null,
  saveAssetType: (assetType) => set({ assetType }),
}))
