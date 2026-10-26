import { createHashRouter } from 'react-router'
import { HomePage } from '@/pages/HomePage.tsx'
import { OnboardingPage } from '@/pages/OnboardingPage.tsx'
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
      { path: 'onboarding', Component: OnboardingPage },
    ],
  },
])
