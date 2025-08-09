"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// SINGLE avatar
const SidebarAvatar = ({ img, name }) =>
  img ? (
    <img
      src={img}
      alt={name}
      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200 shadow-sm group-hover:scale-105 transition-transform"
    />
  ) : (
    <svg className="w-12 h-12 rounded-full" viewBox="0 0 40 40">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a78bfa" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#grad)" />
    </svg>
  );

export default function MessagesPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Can't load users");
        const { users } = await res.json();
        setUsers(users);
      } catch {
        setUsersError("Could not load users.");
      } finally {
        setUsersLoading(false);
      }
    };
    if (session?.user?.id) fetchUsers();
  }, [session?.user?.id]);

  const handleUserClick = userId => router.push(`/messages/${userId}`);

  const filteredUsers = users.filter(
    u =>
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center p-8 bg-white/80 rounded-2xl shadow-xl border border-white/20">
          <p className="text-xl font-bold text-red-600">Please log in to access messages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overscroll-none bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-[320px] border-r border-gray-200 bg-white shadow-xl h-full">
        <div className="px-6 pt-6 pb-2 border-b flex flex-col gap-3 bg-gradient-to-r from-indigo-100 via-white to-purple-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-gray-800 tracking-tight">Members</h2>
            <button
              className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded transition font-medium"
              title="Refresh users"
              onClick={() => window.location.reload()}
            >
              ⟳
            </button>
          </div>
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-indigo-400 pointer-events-none">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M12.9 14.32a7 7 0 1 1 1.41-1.41l5 4.98-1.42 1.42-4.99-5zM8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
            </span>
            <input
              type="search"
              className="pl-10 pr-4 py-2 w-full rounded-full text-base border-2 border-indigo-100 focus:ring-2 focus:ring-indigo-300 transition-all outline-none bg-white shadow-sm"
              placeholder="Search users by name or email"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* User List */}
        <ul className="flex-1 overflow-y-auto py-4 space-y-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-indigo-50">
          {/* Loading skeletons */}
          {usersLoading && (
            <div className="space-y-3 px-5 py-7 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <SidebarAvatar />
                  <div>
                    <div className="w-24 h-3 rounded bg-indigo-100 mb-1" />
                    <div className="w-12 h-2 rounded bg-purple-100" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Error */}
          {usersError && (
            <li className="py-4 text-center text-red-600 text-sm">{usersError}</li>
          )}
          {/* Empty */}
          {!usersLoading && !usersError && filteredUsers.length === 0 && (
            <li className="py-4 text-center text-gray-400 text-sm">No users found.</li>
          )}
          {/* Actual users */}
          {!usersLoading && !usersError &&
            filteredUsers.map(user => (
              <li
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="flex items-center mx-2 px-5 py-4 rounded-xl cursor-pointer group transition-all duration-150 hover:bg-indigo-50/60 hover:shadow-md"
                tabIndex={0}
              >
                <SidebarAvatar img={user.image} name={user.firstName} />
                <div className="flex flex-col ml-3 flex-grow truncate">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-800 group-hover:text-indigo-700 truncate">
                      {user.firstName} {user.lastName}
                    </span>
                   
                  </div>
                  <span className="text-xs text-gray-500 truncate">{user.email}</span>
                </div>
              </li>
            ))}
        </ul>
        {/* Footer: User count only */}
        <div className="px-6 py-4 border-t bg-gradient-to-r from-indigo-50 via-white to-purple-50/70 flex items-center justify-end">
          <div className="text-indigo-500 text-sm font-medium tracking-wide">
            Users: {users.length}
          </div>
        </div>
      </aside>

      {/* MAIN: Centered prompt */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center p-8 bg-white/80 rounded-2xl shadow-xl border border-white/20">
          <svg className="w-14 h-14 mx-auto text-indigo-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 12c0 4.418-4.03 8-9 8a9.864 9.864 0 01-4.255-.949L3 21l1.395-3.72C3.512 15.042 3 13.574 3 12
                c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            <circle cx="8" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="16" cy="12" r="1" />
          </svg>
          <p className="text-xl font-semibold text-gray-700">Start a Conversation</p>
          <p className="text-sm text-gray-500 mt-2">Click a user profile from the sidebar to begin chatting.</p>
        </div>
      </main>
    </div>
  );
}
