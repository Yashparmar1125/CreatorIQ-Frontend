import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';
import { Youtube, ArrowRight, Mail, User, Lock, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email); // Mock signup just logs in
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left Column: Visuals & Social Proof */}
      <div className="hidden lg:flex w-1/2 bg-brand-900 p-16 flex-col justify-between relative">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="mb-20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="font-sora font-bold text-2xl tracking-tighter text-white">CreatorIQ</span>
          </div>

          <h1 className="text-5xl font-bold text-white font-sora leading-tight mb-8">
            The intelligent <span className="text-brand-400">future</span> of YouTube growth.
          </h1>

          <div className="space-y-6 max-w-sm">
             {[
               { icon: <Sparkles className="w-5 h-5" />, text: "AI-driven trend discovery before they peak." },
               { icon: <CheckCircle2 className="w-5 h-5" />, text: "Automated titles & script generation." },
               { icon: <User className="w-5 h-5" />, text: "Audience retention heatmap analysis." }
             ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 text-white/70">
                   <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-400 flex-shrink-0">
                      {benefit.icon}
                   </div>
                   <p className="text-sm font-medium leading-relaxed mt-1">{benefit.text}</p>
                </div>
             ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
           <p className="text-white font-bold mb-4 italic">"This platform saved me 20 hours a week on research alone. It's a game changer."</p>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-700 border-2 border-brand-500" />
              <div>
                 <p className="text-sm font-bold text-white">James C.</p>
                 <p className="text-xs text-white/40">Tech Creator (1.2M Subs)</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="font-sora font-bold text-2xl tracking-tighter">CreatorIQ</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-neutral-900 font-sora">Get started for free</h2>
            <p className="text-neutral-500 mt-2 font-medium">No credit card required. Cancel anytime.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative group">
                  <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe" 
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-200 focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Work Email</label>
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
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Password</label>
                <div className="relative group">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Minimum 8 characters" 
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-200 focus:ring-4 focus:ring-brand-600/10 focus:border-brand-600 outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Free Account <ArrowRight className="w-4 h-4" /></>}
            </button>
            
            <div className="relative flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-neutral-100" />
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest whitespace-nowrap">Or join with</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            <button type="button" className="w-full py-4 bg-white border border-neutral-200 rounded-2xl font-bold text-sm text-neutral-700 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
               <Youtube className="w-5 h-5 text-[#FF0000]" />
               Connect YouTube
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-neutral-500 font-medium">
            Already have an account? <Link to="/login" className="text-brand-600 font-bold hover:underline underline-offset-4">Log in here</Link>
          </p>

          <p className="mt-12 text-center text-[10px] text-neutral-400 leading-relaxed">
            By clicking "Create Free Account", you agree to our <br />
            <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};
