'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Bike, LogOut, ExternalLink, User } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const pathname = usePathname();

  // Do not show the admin navbar or layout wrappers on the login page
  if (pathname.endsWith('/admin/login')) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Successfully logged out', {
          description: 'You have been signed out of the admin portal.'
        });
        router.push(`/${locale}/admin/login`);
        router.refresh();
      } else {
        toast.error('Logout failed', { description: 'Please try again.' });
      }
    } catch (e) {
      toast.error('An error occurred during logout');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo & Navigation */}
            <div className="flex items-center gap-8">
              <Link href={`/${locale}/admin/dashboard`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:bg-red-500 transition-colors">
                  <Bike className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-black text-lg text-white tracking-tight leading-none group-hover:text-red-400 transition-colors">Sahin Cycle</h1>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">Command Center</span>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center gap-2">
                <Link 
                  href={`/${locale}/admin/dashboard`} 
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    pathname.includes('/admin/dashboard') 
                      ? 'bg-slate-800 text-white shadow-inner border border-slate-700/50' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Products Management
                </Link>
                <Link 
                  href={`/${locale}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
                >
                  Live Store
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </nav>
            </div>

            {/* Admin Profile & Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-full shadow-inner">
                <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-xs font-semibold text-slate-300 mr-1 tracking-wide">admin@sahincycle.com</span>
              </div>
              
              <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
              
              <button 
                onClick={handleLogout}
                className="group flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-slate-800 hover:border-red-500 transition-all shadow-sm hover:shadow-red-600/20"
              >
                <span>Logout</span>
                <LogOut className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </button>
            </div>
            
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
