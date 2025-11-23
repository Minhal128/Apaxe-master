import { Search, Bell, ChevronDown, LogOut } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'

export default function Header({ pageTitle = 'Dashboard' }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    window.location.href = 'https://forexsuperadmin.vercel.app/'
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-gray-50 border-0 h-10 rounded-lg"
          />
        </div>
        {/* Notification */}
        <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AD</span>
            </div>
            <ChevronDown size={16} className="text-gray-600" />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
