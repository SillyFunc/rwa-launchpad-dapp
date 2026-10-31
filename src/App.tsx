import { Outlet, ScrollRestoration, useMatches } from 'react-router'
import type { RouteHandle } from './router.ts'
import { Footer } from '@/components/layout/Footer.tsx'
import { Header } from '@/components/layout/Header.tsx'
import goldBackground from '@/assets/home/bg-gold-top.webp'

function App() {
  const hideFooter = useMatches().some(
    (match) => (match.handle as RouteHandle | undefined)?.hideFooter,
  )

  return (
    <div className="relative isolate flex min-h-svh w-full sm:max-w-sm sm:mx-auto flex-col bg-[#070808]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-50 mx-auto w-full sm:max-w-sm"
      >
        <img src={goldBackground} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-[#070808]/75" />
      </div>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <ScrollRestoration />
    </div>
  )
}

export default App
