import { createHashRouter } from 'react-router'

import { HomePage } from '@/pages/HomePage.tsx'
import { AssetDescriptionStep } from '@/pages/launch/AssetDescriptionStep.tsx'
import { AssetTypeStep } from '@/pages/launch/AssetTypeStep.tsx'
import { LaunchLayout } from '@/pages/launch/LaunchLayout.tsx'
import { CompanyDocumentsStep } from '@/pages/onboarding/CompanyDocumentsStep.tsx'
import { OnboardingLayout } from '@/pages/onboarding/OnboardingLayout.tsx'
import { PersonalInfoStep } from '@/pages/onboarding/PersonalInfoStep.tsx'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage.tsx'
import { ProjectListPage } from '@/pages/ProjectListPage.tsx'

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
        path: 'launch',
        Component: LaunchLayout,
        children: [
          { index: true, Component: AssetTypeStep },
          { path: 'details', Component: AssetDescriptionStep },
        ],
      },
      { path: 'projectList', Component: ProjectListPage },
      { path: 'projectDetail', Component: ProjectDetailPage },
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
