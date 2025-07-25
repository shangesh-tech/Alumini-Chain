'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Mail,
  Users,
  Calendar,
  Briefcase,
  Rocket,
  X
} from 'lucide-react';
import { useUIStore } from '@/store/ui-store';

const SIDENAV_ITEMS = [
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
    path: '/members',
    icon: <Users size={20} strokeWidth={1.5} />,
  },
  {
    title: 'Events',
    path: '/events',
    icon: <Calendar size={20} strokeWidth={1.5} />,
  },
  {
    title: 'Jobs',
    path: '/jobs',
    icon: <Briefcase size={20} strokeWidth={1.5} />,
  },
];

const MenuItem = ({ item }) => {
  const pathname = usePathname();
  const { closeSidebar } = useUIStore();

  const isActive = (path) =>
    path === '/'
      ? pathname === '/'
      : pathname.startsWith(path);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <Link
      href={item.path}
      onClick={handleClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group
        ${isActive(item.path)
          ? 'bg-purple-600 text-white font-medium'
          : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}
    >
      <span className={`transition-colors ${isActive(item.path) ? 'text-white' : 'text-gray-600 group-hover:text-black'}`}>
        {item.icon}
      </span>
      <span className="text-sm font-medium">{item.title}</span>
    </Link>
  );
};

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore();
  
  // Close sidebar on route change on mobile
  const pathname = usePathname();
  useEffect(() => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [pathname, closeSidebar]);

  return (
    <>
      {/* Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 flex flex-col z-40 
          transition-transform duration-300 ease-in-out transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Close button - mobile only */}
        <button
          onClick={closeSidebar}
          className="md:hidden absolute top-5 right-1 p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={25} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 px-6 py-5 border-b border-gray-200"
        >
          <span className="h-9 w-9 bg-gradient-to-tr from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <Rocket size={20} className="text-white" />
          </span>
          <span className="font-bold text-xl text-black">Alumini Chain</span>
        </Link>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-4">Main Menu</p>
          <nav className="space-y-1">
            {SIDENAV_ITEMS.map((item, idx) => (
              <MenuItem key={idx} item={item} />
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">© {new Date().getFullYear()} Alumini Chain</span>
            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full font-medium">v1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;