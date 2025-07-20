'use client'

import { useState } from 'react'
import { Menu, User, LogOut, Settings} from 'lucide-react'
import { useUIStore } from '@/store/ui-store'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { toggleSidebar } = useUIStore()

  return (
    <header className="mx-4 bg-zinc-800/50 backdrop-blur-sm shadow-lg border border-zinc-700 flex items-center justify-between px-4 py-3 sticky top-0 z-10 rounded-lg mt-4">
      <button 
        className="text-zinc-300 hover:text-white transition-colors"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <div className="relative">
        <button 
          className="flex items-center text-zinc-300 hover:text-white transition-colors"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <User size={24} />
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 shadow-lg rounded-lg py-2 px-1">
            <li>
              <a href="/settings" className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-purple-600 hover:text-white rounded-md transition-all duration-200">
                <Settings size={16} className="inline mr-2" /> Profile
              </a>
            </li>
            <li>
              <button className="w-full flex items-center text-left px-4 py-2 text-sm text-zinc-300 hover:bg-purple-600 hover:text-white rounded-md transition-all duration-200">
                <LogOut size={16} className="inline mr-2" /> Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header 