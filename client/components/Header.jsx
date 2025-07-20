'use client'

import { useState } from 'react'
import { Menu, User, LogOut, Settings } from 'lucide-react'
import { useUIStore } from '@/store/ui-store'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { toggleSidebar } = useUIStore()

  return (
    <header className="sticky top-0 z-10 bg-zinc-900/50 backdrop-blur-sm border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center">
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            onClick={toggleSidebar}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Right side */}
        <div className="relative">
          <button 
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <User size={18} />
            </div>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-20"
                onClick={() => setDropdownOpen(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 mt-2 w-48 py-2 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 z-30">
                <a 
                  href="/settings" 
                  className="flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  <Settings size={16} className="mr-2" />
                  Profile Settings
                </a>
                <button 
                  className="w-full flex items-center px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header 