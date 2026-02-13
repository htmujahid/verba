import { Outlet } from 'react-router'

import { Header } from './header'
import { Footer } from './footer'

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
