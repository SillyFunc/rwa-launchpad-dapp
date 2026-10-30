import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from '@/router.ts'
import { AppProviders } from '@/providers/AppProviders.tsx'
// index.css 覆盖 TDesign 主题变量，须在其后引入
import 'tdesign-mobile-react/es/style/index.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
