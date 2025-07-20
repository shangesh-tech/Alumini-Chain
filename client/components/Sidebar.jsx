'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Folder, 
  Mail, 
  Settings, 
  HelpCircle, 
  ChevronDown,
  Rocket
} from 'lucide-react';
import { useUIStore } from '@/stores/ui-store'

export const SIDENAV_ITEMS = [
  {
    title: 'Home',
    path: '/',
    icon: <Home size={20} strokeWidth={1.5} />,
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <Folder size={20} strokeWidth={1.5} />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/projects' },
      { title: 'Web Design', path: '/projects/web-design' },
      { title: 'Graphic Design', path: '/projects/graphic-design' },
    ],
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <Mail size={20} strokeWidth={1.5} />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings size={20} strokeWidth={1.5} />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
    icon: <HelpCircle size={20} strokeWidth={1.5} />,
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
            className={`flex flex-row items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-200
              ${isActive(item.path) 
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm' 
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}
            `}
          >
            <div className="flex flex-row items-center gap-3">
              <span className={`${isActive(item.path) ? 'text-blue-600' : 'text-zinc-500'} transition-colors`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ease-in-out ${subMenuOpen ? 'rotate-180 text-blue-600' : 'text-zinc-400'}`}
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
                          ? 'bg-blue-50 font-medium text-blue-700'
                          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}
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
              ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm'
              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}
          `}
        >
          <span className={`${isActive(item.path) ? 'text-blue-600' : 'text-zinc-500'} transition-colors`}>
            {item.icon}
          </span>
          <span className="text-sm font-medium">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useUIStore();
  
  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <aside className={`fixed top-0 left-0 w-64 bg-white h-full border-r border-zinc-200 flex flex-col shadow-sm z-20 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col w-full h-full">
          <Link
            href="/"
            className="flex items-center gap-3 px-6 py-5 border-b border-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <span className="h-9 w-9 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <Rocket size={20} className="text-white" />
            </span>
            <span className="font-bold text-xl text-zinc-800">NextHQ</span>
          </Link>
          
          <div className="flex-1 overflow-y-auto px-3 py-4">
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
          
          <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">© {new Date().getFullYear()} NextHQ</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">v1.0.0</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;