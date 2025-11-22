import { Search, Bell, ChevronDown, LogOut } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    window.location.href = 'https://forexsuperadmin.vercel.app/'
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=22c55e&color=fff"
                alt="User"
                className="w-full h-full object-cover"
              />
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
