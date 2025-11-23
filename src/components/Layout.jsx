import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  const location = useLocation()
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/' || path === '/dashboard') return 'Dashboard'
    if (path === '/clients') return 'Clients'
    if (path === '/funds') return 'Funds'
    if (path === '/notifications') return 'Notifications'
    if (path === '/reports') return 'Reports'
    if (path === '/settings') return 'Settings'
    if (path === '/trading-rules') return 'Trading Rules'
    return 'Dashboard'
  }

  return (
    <div className="flex h-screen bg-[#f5f5f7]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageTitle={getPageTitle()} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
