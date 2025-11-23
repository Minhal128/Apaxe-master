import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Wallet, LineChart, Bell, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Wallet, label: 'Funds', path: '/funds' },
    { icon: LineChart, label: 'Trading rules', path: '/trading-rules' },
    { icon: LineChart, label: 'Reports', path: '/reports' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-10 h-10"
          />
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-[195px] bg-gray-50 border-r border-gray-200 flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="px-6 py-6 flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-15 h-15" 
            style={{
              marginTop: "-50px"
            }}
          />
        </div>

        {/* Menu Items */}
        <nav 
          className="flex-1 px-3 py-2"
          style={{
            marginTop: "-70px"
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

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-gray-50 border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Logo Section */}
        <div className="px-6 py-6 flex items-center gap-2 border-b border-gray-200">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-12 h-12"
          />
          <button
            onClick={toggleMobileMenu}
            className="ml-auto p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 px-3 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleMobileMenu}
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

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  )
}