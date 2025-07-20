'use client'

import { useState } from 'react'
import { Menu, User, LogOut, Settings} from 'lucide-react'
import { useUIStore } from '@/store/ui-store'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { toggleSidebar } = useUIStore()

  return (
    <header className="bg-white dark:bg-gray-800 shadow flex items-center justify-between px-4 py-3 sticky top-0 z-10">
      <button 
        className="md:hidden text-gray-500 dark:text-gray-300"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <div className="text-xl font-bold text-gray-800 dark:text-white">Alumini Chain</div>
      <div className="relative">
        <button 
          className="flex items-center text-gray-500 dark:text-gray-300"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <User size={24} />
        </button>
        {dropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-1">
            <li>
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                Profile
              </a>
            </li>
            <li>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                <Settings size={16} className="inline mr-2" /> Settings
              </a>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
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