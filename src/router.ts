import { createHashRouter } from 'react-router'
import { HomePage } from '@/pages/HomePage.tsx'
import { CompanyDocumentsStep } from '@/pages/onboarding/CompanyDocumentsStep.tsx'
import { OnboardingLayout } from '@/pages/onboarding/OnboardingLayout.tsx'
import { PersonalInfoStep } from '@/pages/onboarding/PersonalInfoStep.tsx'
import App from './App.tsx'

export type RouteHandle = {
  hideFooter?: boolean
}

export const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'onboarding',
        Component: OnboardingLayout,
        children: [
          { index: true, Component: PersonalInfoStep },
          { path: 'documents', Component: CompanyDocumentsStep },
        ],
      },
    ],
  },
])
