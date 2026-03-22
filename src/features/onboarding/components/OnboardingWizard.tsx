import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '../stores/onboardingStore';
import { ChevronRight, Youtube, Check, Sparkles, Rocket } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const steps = [
  { id: 1, name: 'Welcome' },
  { id: 2, name: 'YouTube' },
  { id: 3, name: 'Niche' },
  { id: 4, name: 'Preferences' },
  { id: 5, name: 'Ready' },
];

export const OnboardingWizard: React.FC = () => {
  const { step, nextStep, prevStep, isYoutubeConnected, setYoutubeConnected, niche, setNiche, format, setFormat, tone, setTone, setFrequency } = useOnboardingStore();

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <div className="w-24 h-24 bg-brand-700 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-brand-700/20">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-sora tracking-tight">
                Your AI Content Strategist.
              </h1>
              <p className="text-neutral-600 text-lg max-w-md mx-auto">
                Join thousands of creators using intelligence to dominate YouTube. 3 steps to unlock your growth.
              </p>
            </div>
            <button 
              onClick={nextStep}
              className="px-10 py-4 bg-brand-900 text-white rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-900/10 flex items-center gap-3 mx-auto"
            >
              Get Started
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 max-w-lg mx-auto"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-sora">Connect YouTube</h2>
              <p className="text-neutral-500">We need access to your analytics to provide personalized insights.</p>
            </div>
            
            <div className="p-8 bg-white border border-neutral-200 rounded-3xl shadow-sm space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                    <Youtube className="w-10 h-10 text-red-600" />
                  </div>
                  {isYoutubeConnected && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success-600 rounded-full border-4 border-white flex items-center justify-center animate-in zoom-in duration-300">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              {!isYoutubeConnected ? (
                <button 
                  onClick={() => setYoutubeConnected(true)}
                  className="w-full py-4 bg-white border-2 border-neutral-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:border-red-600 hover:text-red-600 transition-all group"
                >
                  <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Connect YouTube Channel
                </button>
              ) : (
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
                      <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Yash" alt="Channel" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">Yash's Tech Hub</p>
                        <p className="text-xs text-neutral-500">Connected successfully</p>
                      </div>
                   </div>
                   <button 
                    onClick={nextStep}
                    className="w-full py-4 bg-brand-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
            
            <button onClick={prevStep} className="text-neutral-400 text-sm hover:text-brand-900 transition-colors">Go Back</button>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 border-4 border-dashed border-brand-700/20 rounded-full mx-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Rocket className="w-16 h-16 text-brand-700 animate-bounce" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold font-sora">You're Ready to Grow.</h1>
              <p className="text-neutral-600 max-w-md mx-auto">
                We've analyzed your niche and prepared your first set of recommendations.
              </p>
            </div>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="px-12 py-4 bg-brand-900 text-white rounded-full font-bold text-lg shadow-2xl shadow-brand-900/40 hover:scale-105 active:scale-95 transition-all"
            >
              Go to Dashboard
            </button>
          </motion.div>
        );

      case 3:
        const niches = ['Tech', 'Gaming', 'Finance', 'Fitness', 'Cooking', 'Vlog', 'Education', 'Entertainment', 'Beauty', 'Travel', 'Music', 'Fashion'];
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center space-y-8 max-w-2xl mx-auto"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-sora">Select Your Niche</h2>
              <p className="text-neutral-500">Choose up to 3 categories that best describe your content.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {niches.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    if (niche.includes(n)) {
                      setNiche(niche.filter(i => i !== n));
                    } else if (niche.length < 3) {
                      setNiche([...niche, n]);
                    }
                  }}
                  className={cn(
                    "px-6 py-3 rounded-full border-2 transition-all font-medium",
                    niche.includes(n) 
                      ? "bg-brand-700 border-brand-700 text-white shadow-lg shadow-brand-700/20" 
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-brand-700/50"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
               <button onClick={prevStep} className="px-8 py-3 text-neutral-400 font-bold hover:text-brand-900">Back</button>
               <button 
                onClick={nextStep} 
                disabled={niche.length === 0}
                className="px-10 py-3 bg-brand-900 text-white rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
               >
                 Continue
               </button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center space-y-8 max-w-lg mx-auto"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-sora">Content Preferences</h2>
              <p className="text-neutral-500">Help us tailor your AI-generated strategies.</p>
            </div>
            
            <div className="space-y-6 text-left">
              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700">Preferred Format</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Long-form', 'Shorts', 'Both'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f.toLowerCase() as any)}
                      className={cn(
                        "py-3 rounded-xl border-2 text-sm font-bold transition-all",
                        format === f.toLowerCase() ? "bg-brand-100 border-brand-700 text-brand-700" : "bg-white border-neutral-100 text-neutral-500 hover:border-neutral-200"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700">Upload Frequency</label>
                <select 
                  className="w-full p-4 bg-white border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 outline-none transition-all"
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="">Select frequency...</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">2-3 times a week</option>
                  <option value="monthly">Weekly</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-700">Tone of Voice</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Educational', 'Entertaining', 'Authoritative', 'Conversational'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={cn(
                        "py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all text-left flex justify-between items-center",
                        tone === t ? "bg-brand-100 border-brand-700 text-brand-700" : "bg-white border-neutral-100 text-neutral-500"
                      )}
                    >
                      {t}
                      {tone === t && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
               <button onClick={prevStep} className="px-8 py-3 text-neutral-400 font-bold hover:text-brand-900">Back</button>
               <button 
                onClick={nextStep} 
                disabled={!format || !tone}
                className="px-10 py-3 bg-brand-900 text-white rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
               >
                 Review & Finish
               </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {step < 5 && (
          <div className="flex justify-center gap-2 mb-12">
            {steps.map((s) => (
              <div 
                key={s.id}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  step >= s.id ? "bg-brand-900 w-12" : "bg-neutral-200 w-8"
                )}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <div key={step}>
            {renderStep()}
          </div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 text-neutral-400 text-xs flex gap-6">
        <span>© 2026 CreatorIQ</span>
        <a href="#" className="hover:text-brand-900">Privacy Policy</a>
        <a href="#" className="hover:text-brand-900">Terms of Service</a>
      </div>
    </div>
  );
};
