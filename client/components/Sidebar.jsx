'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Mail, 
  ChevronDown,
  Rocket,
  Calendar,
  Briefcase,
  User
} from 'lucide-react';
import { useUIStore } from '@/store/ui-store'

export const SIDENAV_ITEMS = [
  {
    title: 'Feed',
    path: '/',
    icon: <Home size={20} strokeWidth={1.5} />,
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <Mail size={20} strokeWidth={1.5} />,
  },
  {
    title: 'Members',
    icon: <User size={20} strokeWidth={1.5} />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/members' },
      { title: 'Bookmarks', path: '/members/bookmarks' }
    ],
  },
 
  {
    title: 'Events',
    path: '/events',
    icon: <Calendar size={20} strokeWidth={1.5} />
  },
  {
    title: 'Jobs',
    path: '/jobs',
    icon: <Briefcase size={20} strokeWidth={1.5} />,
  },
  
];

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const { closeSidebar } = useUIStore();

  const isActive = (path) =>
    path === '/'
      ? pathname === '/'
      : pathname.startsWith(path);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setSubMenuOpen((open) => !open);
    }
  };

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <div className="my-1">
      {item.submenu ? (
        <div>
          <button
            onClick={() => setSubMenuOpen((open) => !open)}
            onKeyDown={handleKeyDown}
            aria-expanded={subMenuOpen}
            aria-controls={`submenu-${item.title}`}
            className={`flex flex-row items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-200
              ${isActive(item.path) 
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-sm' 
                : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}
            `}
          >
            <div className="flex flex-row items-center gap-3">
              <span className={`${isActive(item.path) ? 'text-white' : 'text-zinc-400'} transition-colors`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ease-in-out ${subMenuOpen ? 'rotate-180 text-white' : 'text-zinc-400'}`}
            />
          </button>
          <div
            id={`submenu-${item.title}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              subMenuOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
            } ml-7 pl-2 border-l border-zinc-100`}
            aria-hidden={!subMenuOpen}
          >
            <ul className="flex flex-col space-y-1 py-1">
              {item.subMenuItems &&
                item.subMenuItems.map((subItem, idx) => (
                  <li key={idx}>
                    <Link
                      href={subItem.path}
                      onClick={handleMenuClick}
                      className={`block px-3 py-2 rounded-md transition-all duration-150 text-sm
                        ${pathname === subItem.path
                          ? 'bg-purple-600 font-medium text-white'
                          : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}
                      `}
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <Link
          href={item.path}
          onClick={handleMenuClick}
          className={`flex flex-row items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out
            ${isActive(item.path)
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-sm'
              : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}
          `}
        >
          <span className={`${isActive(item.path) ? 'text-white' : 'text-zinc-400'} transition-colors`}>
            {item.icon}
          </span>
          <span className="text-sm font-medium">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore();
  
  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0  backdrop-blur-sm z-10 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside className={`fixed top-0 left-0 w-64 bg-zinc-800 h-full  flex flex-col shadow-sm z-20 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col w-full h-full">
          <Link
            href="/"
            className="flex items-center gap-3 px-6 py-5 border-b border-zinc-700 hover:bg-zinc-700 transition-colors"
          >
            <span className="h-9 w-9 bg-gradient-to-tr from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Rocket size={20} className="text-white" />
            </span>
            <span className="font-bold text-xl text-white">Alumini Chain</span>
          </Link>
          
          <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-zinc-800 hover:scrollbar-thumb-purple-800">
            <div className="mb-4">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
              <nav>
                <ul className="space-y-0.5">
                  {SIDENAV_ITEMS.map((item, idx) => (
                    <li key={idx}>
                      <MenuItem item={item} />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-zinc-700 bg-zinc-900/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">© {new Date().getFullYear()} Alumini Chain</span>
              <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full font-medium">v1.0.0</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;