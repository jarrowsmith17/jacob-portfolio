'use client'; // <--- This magic line makes the onClick work

import { signOut } from 'next-auth/react';
import { HiLogout } from 'react-icons/hi';

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/' })} 
      className="flex items-center gap-2 bg-white text-red-600 border border-slate-200 hover:bg-red-50 hover:border-red-200 px-4 py-2 rounded-lg transition-all shadow-sm text-sm font-medium"
    >
      <HiLogout size={18} />
      <span>Sign Out</span>
    </button>
  );
}