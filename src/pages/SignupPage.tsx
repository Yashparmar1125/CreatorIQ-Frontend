import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../stores/useAuthStore';
import { Youtube, Mail, User, Lock, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-950 flex overflow-hidden relative">
      <div className="absolute inset-0 mesh-glow opacity-20 pointer-events-none" />

      {/* Left Column: Visual Mastery */}
      <div className="hidden lg:flex w-1/2 p-20 flex-col justify-between relative border-r border-white/5 bg-white/2 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px] animate-breathe" />
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <div className="mb-24 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-600 font-black text-2xl shadow-2xl">
              C
            </div>
            <span className="font-sora font-black text-3xl tracking-tighter text-white">CreatorIQ</span>
          </div>

          <h1 className="text-6xl font-black text-white font-sora leading-tight mb-10 tracking-[-0.04em]">
            The <span className="text-brand-400">Neural</span> Era of Creator Growth.
          </h1>

          <div className="space-y-10 max-w-sm">
             {[
               { icon: <Sparkles className="w-6 h-6" />, text: "AI-driven discovery before trends peak." },
               { icon: <CheckCircle2 className="w-6 h-6" />, text: "Automated high-CTR structural blueprints." },
               { icon: <User className="w-6 h-6" />, text: "Deep behavior heatmap analysis." }
             ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-6 text-neutral-400 group">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-400 flex-shrink-0 border border-white/5 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                      {benefit.icon}
                   </div>
                   <p className="text-lg font-bold leading-relaxed mt-1 group-hover:text-white transition-colors">{benefit.text}</p>
                </div>
             ))}
          </div>
        </div>

        <div className="relative z-10 glass-dark p-10 rounded-[40px] border border-white/10 backdrop-blur-xl group cursor-pointer hover:bg-white/5 transition-all">
           <p className="text-white text-xl font-bold mb-6 italic leading-relaxed tracking-tight group-hover:text-brand-300 transition-colors">"This platform automated 20 hours of my weekly research. It's the standard for professional creators."</p>
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 border-2 border-brand-600 shadow-2xl overflow-hidden">
                 <img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Testimonial" />
              </div>
              <div>
                 <p className="text-base font-black text-white tracking-tight">James C.</p>
                 <p className="text-xs font-black text-brand-400 uppercase tracking-widest">Tech Architect (1.2M Subs)</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Column: Secure Entry */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative z-10 bg-white">
        <div className="w-full max-w-md animate-in fade-in duration-500">
          <div className="lg:hidden mb-12 flex items-center gap-4 justify-center">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="font-sora font-bold text-2xl tracking-tight text-neutral-900">CreatorIQ</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-neutral-900 font-sora tracking-tight">Create Account</h2>
            <p className="text-neutral-500 mt-2 font-medium text-base">Start your journey today. No credit card required.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider pl-1">Full Name</label>
                <div className="relative group">
                  <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elon Musk" 
                    required
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white text-neutral-900 text-sm font-bold focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600/20 outline-none transition-all"
                  />
                </div>
              </div>

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
                    placeholder="At least 8 characters" 
                    required
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white text-neutral-900 text-sm font-bold focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 active:scale-[0.96] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
            
            <div className="relative flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-neutral-100" />
              <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider whitespace-nowrap">OR</span>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            <button type="button" className="w-full py-2.5 border border-neutral-200 rounded-xl font-bold text-[10px] uppercase tracking-wider text-neutral-600 hover:bg-neutral-50 transition-all flex items-center justify-center gap-3">
               <Youtube className="w-5 h-5 text-[#FF0000]" />
               Connect YouTube
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
            Already have an account? <Link to="/login" className="text-brand-600 hover:text-brand-500 transition-colors">Log in</Link>
          </p>

          <p className="mt-12 text-center text-[9px] text-neutral-400 font-bold uppercase tracking-wider leading-relaxed max-w-xs mx-auto">
            By signing up, you agree to our <br />
            <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors underline underline-offset-4">Terms of Service</a> and <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors underline underline-offset-4">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};
