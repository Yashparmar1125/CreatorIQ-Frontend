import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';
import { Youtube, Mail, Lock, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    const from = (location.state as any)?.from?.pathname || '/app/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 mesh-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none animate-breathe" />

      <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 shadow-xl relative z-10 overflow-hidden animate-in fade-in duration-500">
        <div className="p-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg">
            C
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 font-sora tracking-tight">Welcome Back</h1>
          <p className="text-neutral-500 mt-2 text-sm font-medium">Log in to your account to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="px-10 pb-10 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider pl-1">Email</label>
              <div className="relative group">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com" 
                  required
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white text-neutral-900 text-sm font-bold focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600/20 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider pl-1">Password</label>
              <div className="relative group">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white text-neutral-900 text-sm font-bold focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-500 hover:text-neutral-900 transition-colors">
               <input type="checkbox" className="w-4 h-4 rounded border-neutral-200 text-brand-600 focus:ring-brand-600/20" />
               <span className="font-bold">Remember me</span>
            </label>
            <a href="#" className="text-brand-600 font-bold hover:text-brand-500 transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
               <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
               "Log In"
            )}
          </button>
          
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider whitespace-nowrap">OR</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          <button type="button" className="w-full py-2.5 border border-neutral-200 rounded-xl font-bold text-[10px] uppercase tracking-wider text-neutral-600 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3">
             <Youtube className="w-5 h-5 text-[#FF0000]" />
             Continue with YouTube
          </button>
        </form>

        <div className="px-10 py-6 bg-neutral-50 border-t border-neutral-100 text-center">
           <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
             New here? <Link to="/signup" className="text-brand-600 hover:text-brand-500 transition-colors">Create account</Link>
           </p>
        </div>
      </div>
      
      <p className="mt-8 text-neutral-600 text-[9px] font-bold uppercase tracking-widest">
        © 2026 CreatorIQ • Secure Portal
      </p>
    </div>
  );
};
