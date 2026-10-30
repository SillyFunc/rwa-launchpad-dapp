import { Outlet } from 'react-router'
import { PageTitle } from '@/components/common/PageTitle.tsx'

export function OnboardingLayout() {
  return (
    <div className="px-3 py-6">
      <PageTitle title="Registration Verification (KYC)" />
      <Outlet />
    </div>
  )
}
