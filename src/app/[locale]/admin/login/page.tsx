'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight, Bike, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success('Successfully logged in!', {
          description: 'Welcome back to the Admin Dashboard.',
        });
        router.push('/en/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error('Authentication Failed', {
          description: data.error || 'Invalid credentials provided.',
        });
      }
    } catch (err) {
      toast.error('Server Error', {
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans selection:bg-red-500/30">
      {/* Left Column - Cinematic Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
        
        <Image
          src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop"
          alt="Cinematic Bicycle Workshop"
          fill
          className="object-cover object-center opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:scale-105 transition-all duration-1000 ease-in-out"
          sizes="50vw"
          priority
        />

        {/* Luxury Glassmorphism Info Card */}
        <div className="relative z-20 mt-auto p-12 w-full max-w-2xl">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl shadow-black/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/30">
                <Bike className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Sahin Cycle Store</h2>
                <p className="text-red-400 font-medium text-sm tracking-widest uppercase">Admin Portal</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg font-light">
              Manage inventory, monitor sales, and orchestrate the digital storefront from a unified command center.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 lg:hidden flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
              <Bike className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">Sahin Cycle Store</h2>
              <p className="text-red-400 font-medium text-xs tracking-widest uppercase">Admin Portal</p>
            </div>
          </div>

          <div className="space-y-2 mb-10">
            <h1 className="text-4xl font-black text-white tracking-tight">Welcome back</h1>
            <p className="text-slate-400 text-lg">Enter your credentials to access the dashboard.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2 relative group">
                <label className="text-xs font-bold tracking-wider uppercase text-slate-400 ml-1 group-focus-within:text-red-400 transition-colors">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="admin@sahincycle.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-xs font-bold tracking-wider uppercase text-slate-400 ml-1 group-focus-within:text-red-400 transition-colors">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-red-600 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Command Center</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>
          
          <div className="mt-12 text-center text-sm text-slate-500 font-medium">
            <p>Secure administrative access strictly authorized personnel only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
