'use client';

import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="text-center space-y-8">
        {/* 404 Icon */}
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl rotate-12 opacity-20 absolute top-0 left-0" />
          <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl -rotate-12 opacity-20 absolute top-0 left-0" />
          <div className="w-32 h-32 flex items-center justify-center relative">
            <span className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              404
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Page Not Found</h1>
          <p className="text-zinc-400 max-w-md">
            Oops! The page you're looking for seems to have wandered off into the blockchain...
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Home size={20} />
            Return to Feed
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}