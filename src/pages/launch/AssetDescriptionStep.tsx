import { Navigate } from 'react-router'

import { m } from '@/paraglide/messages.js'

import { LaunchStepShell } from './LaunchStepShell.tsx'
import { useLaunchDraftStore } from './useLaunchDraftStore.ts'

export function AssetDescriptionStep() {
  const hasAssetType = useLaunchDraftStore((state) => state.assetType !== null)

  if (!hasAssetType) return <Navigate to="/launch" replace />

  return (
    <LaunchStepShell
      title={m.launch_details_heading()}
      description={m.launch_details_body()}
    />
  )
}
