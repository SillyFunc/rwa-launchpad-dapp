import { z } from 'zod'

export const assetTypes = ['real-estate', 'equity', 'debt', 'income'] as const

export type AssetType = (typeof assetTypes)[number]

export const assetTypeSchema = z.object({
  assetType: z.enum(assetTypes),
})

export type AssetTypeValues = z.input<typeof assetTypeSchema>

export const emptyAssetType: AssetTypeValues = {
  assetType: 'real-estate',
}
