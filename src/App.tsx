import { Outlet } from 'react-router'
import { Footer } from './components/layout/Footer.tsx'
import { Header } from './components/layout/Header.tsx'

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
