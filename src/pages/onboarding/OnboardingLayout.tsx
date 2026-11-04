import { useState } from 'react'
import { Outlet } from 'react-router'
import { PageTitle } from '@/components/common/PageTitle.tsx'
import { m } from '@/paraglide/messages.js'
import { LaunchStatusFilter } from './LaunchStatusFilter.tsx'
import { OnboardingTabs, type OnboardingTab } from './OnboardingTabs.tsx'

export function OnboardingLayout() {
  const [tab, setTab] = useState<OnboardingTab>('profile')

  return (
    <div className="px-3 py-6">
      <PageTitle title={m.kyc_page_title()} />
      <OnboardingTabs value={tab} onChange={setTab} />
      <div
        id="onboarding-panel-profile"
        role="tabpanel"
        aria-labelledby="onboarding-tab-profile"
        hidden={tab !== 'profile'}
      >
        <Outlet />
      </div>
      <div
        id="onboarding-panel-launches"
        role="tabpanel"
        aria-labelledby="onboarding-tab-launches"
        hidden={tab !== 'launches'}
      >
        <LaunchStatusFilter />
      </div>
    </div>
  )
}
