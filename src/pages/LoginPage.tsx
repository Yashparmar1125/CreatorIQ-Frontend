import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';
import { Youtube, ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-200 overflow-hidden">
        <div className="p-8 pb-0">
          <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-600/20 mb-6">
            C
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 font-sora">Welcome Back</h1>
          <p className="text-neutral-500 mt-2 text-sm leading-relaxed">Enter your credentials to access your creator dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.15em] pl-1">Work Email</label>
              <div className="relative group">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-200 focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.15em] pl-1">Password</label>
              <div className="relative group">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-200 focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-500 hover:text-neutral-700 transition-colors">
               <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-600" />
               Remember me
            </label>
            <a href="#" className="text-brand-600 hover:text-brand-700 transition-colors">Forgot Password?</a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-brand-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
          
          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest whitespace-nowrap">Or continue with</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          <button type="button" className="w-full py-4 bg-white border border-neutral-200 rounded-2xl font-bold text-sm text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
             <Youtube className="w-5 h-5 text-[#FF0000]" />
             Youtube Account
          </button>
        </form>

        <div className="px-8 py-6 bg-neutral-50/50 border-t border-neutral-100 text-center">
           <p className="text-xs font-medium text-neutral-500">
             New to CreatorIQ? <Link to="/signup" className="text-brand-600 font-bold hover:underline underline-offset-4">Create an account</Link>
           </p>
        </div>
      </div>
      
      <p className="mt-8 text-neutral-400 text-[10px] font-medium uppercase tracking-[0.2em]">
        © 2026 CreatorIQ • Privacy • Terms
      </p>
    </div>
  );
};
