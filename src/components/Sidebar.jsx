import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Wallet, LineChart, Bell, Settings } from 'lucide-react'

export default function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Wallet, label: 'Funds', path: '/funds' },
    { icon: LineChart, label: 'Trading rules', path: '/trading-rules' },
    { icon: LineChart, label: 'Reports', path: '/reports' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <div className="w-[195px] bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-2">
     <img src="/logo.png" alt="Logo" className="w-15 h-15" 
     style={{
        marginTop:"-50px"
     }}
     />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-2"
      style={{
        marginTop:"-70px"
      }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#1a3a2e] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
