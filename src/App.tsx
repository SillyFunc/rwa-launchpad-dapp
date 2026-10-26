import { Outlet, useMatches } from 'react-router'
import { Footer } from '@/components/layout/Footer.tsx'
import { Header } from '@/components/layout/Header.tsx'
import type { RouteHandle } from './router.ts'

function App() {
  const hideFooter = useMatches().some(
    (match) => (match.handle as RouteHandle | undefined)?.hideFooter,
  )

  return (
    <div className="flex min-h-svh w-full sm:max-w-sm sm:mx-auto flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default App
