import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, PlayCircle, BarChart2, ArrowRight, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router';

export const LandingPage: React.FC = () => {
  
  const benefits = [
    {
      title: 'Trend Awareness',
      stats: '85%',
      sub: 'Faster discovery',
      icon: <Zap className="w-5 h-5 text-indigo-600" />,
      desc: 'Identify breakout topics using our recursive AI monitoring system before your competitors do.'
    },
    {
      title: 'Predictive Growth',
      stats: '12.4x',
      sub: 'Higher reach',
      icon: <BarChart2 className="w-5 h-5 text-indigo-600" />,
      desc: 'Our algorithms predict which thumbnails and titles will trigger the YouTube recommendation engine.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-brand-600/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-neutral-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-brand-600/20">
              C
            </div>
            <span className="font-sora font-bold text-2xl tracking-tight text-neutral-900">
              Creator<span className="text-brand-600">IQ</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-neutral-500">
            <a href="#" className="hover:text-brand-600 transition-colors">Features</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Intelligence</a>
            <a href="#" className="hover:text-brand-600 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/onboarding" className="text-sm font-bold text-neutral-600 hover:text-brand-600 transition-colors hidden sm:block">
              Log in
            </Link>
            <Link to="/onboarding" className="px-7 py-3 bg-neutral-900 text-white rounded-full font-bold text-sm hover:bg-brand-600 transition-all shadow-xl shadow-neutral-900/10">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/30 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest">v2.0 Beta: The Intelligence Era</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-bold font-sora text-neutral-900 leading-[0.95] tracking-tighter"
              >
                Scientific <br />
                YouTube <br />
                <span className="text-brand-600 underline decoration-indigo-200 underline-offset-8">Growth.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-neutral-500 max-w-lg leading-relaxed"
              >
                The enterprise-grade platform that turns YouTube data into predictable viral strategies. Scale your views with AI precision.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/onboarding" className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-brand-600/20 flex items-center gap-3 group">
                   Master Your Channel
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-10 py-5 bg-white text-neutral-800 rounded-2xl font-bold text-lg border border-neutral-200 hover:bg-neutral-50 flex items-center gap-3">
                   <PlayCircle className="w-5 h-5 text-brand-600" />
                   Watch Demo
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-white rounded-[40px] border border-neutral-100 shadow-2xl overflow-hidden p-3 group">
                 <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  className="rounded-[30px] w-full h-[600px] object-cover object-top opacity-90 group-hover:scale-[1.02] transition-transform duration-1000"
                  alt="Dashboard View"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
                 
                 {/* Floating elements */}
                 <div className="absolute top-1/4 -right-10 p-6 bg-white rounded-3xl shadow-2xl border border-neutral-100 animate-float">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Impact Score</p>
                    <p className="text-3xl font-bold text-brand-600 font-mono">98.4</p>
                 </div>
                 <div className="absolute bottom-1/4 -left-10 p-6 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex gap-1 mb-2">
                       {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-6 bg-brand-500 rounded-full" />)}
                       <div className="w-1.5 h-6 bg-neutral-700 rounded-full" />
                    </div>
                    <p className="text-xs font-bold text-neutral-100">Trend Detected</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof Marquee */}
      <section className="py-20 border-y border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
          
          <div className="flex gap-20 items-center animate-scroll opacity-30">
            {['MRBEAST', 'MKBHD', 'VERITASEUM', 'ALI ABDAAL', 'VOX MEDIA', 'TECHCRUNCH', 'MRBEAST', 'MKBHD', 'VERITASEUM'].map((name, i) => (
              <span key={i} className="text-3xl font-black font-sora text-neutral-900 italic tracking-tighter whitespace-nowrap">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Feature Sections */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
               <div className="space-y-4">
                  <h2 className="text-5xl font-bold font-sora tracking-tight leading-tight">Intelligence that drives <span className="text-brand-600">retention.</span></h2>
                  <p className="text-xl text-neutral-500 leading-relaxed">We analyzed 500 million hours of YouTube watch time to build an engine that understands viewer behavior better than humans.</p>
               </div>

               <div className="space-y-8">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex gap-6 group">
                       <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center transition-colors group-hover:bg-brand-600 group-hover:text-white">
                         {b.icon}
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-xl font-bold font-sora">{b.title}</h4>
                          <p className="text-neutral-500 text-sm max-w-sm">{b.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-6 pt-12">
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-neutral-100 space-y-4 flex flex-col items-center text-center">
                     <div className="text-4xl font-black text-brand-600 font-mono tracking-tighter">85%</div>
                     <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Hook Score</p>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] shadow-xl border border-neutral-100 space-y-4 flex flex-col items-center text-center">
                     <div className="text-4xl font-black text-brand-600 font-mono tracking-tighter">1.2M</div>
                     <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Rec views</p>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="bg-neutral-900 p-8 rounded-[40px] shadow-2xl space-y-4 flex flex-col items-center text-center text-white">
                     <MousePointer2 className="w-8 h-8 text-brand-600" />
                     <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">CTR Optimization</p>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-neutral-100 space-y-4 flex flex-col items-center text-center">
                     <div className="text-4xl font-black text-neutral-900 font-mono tracking-tighter">Gold</div>
                     <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Tier status</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-neutral-900 relative overflow-hidden text-center">
         <div className="absolute inset-0 bg-brand-600/10 blur-3xl rounded-full translate-y-1/2 scale-150" />
         <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-10">
            <h2 className="text-5xl md:text-7xl font-bold font-sora text-white tracking-tighter">Scale your channel on autopilot.</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Join the next generation of data-driven creators. Start your 14-day absolute free trial today.</p>
            <div className="flex justify-center gap-6">
               <Link to="/onboarding" className="px-12 py-6 bg-brand-600 text-white rounded-2xl font-bold text-xl hover:bg-brand-500 transition-all shadow-2xl shadow-brand-600/30">
                  Join Pre-Launch Access
               </Link>
            </div>
         </div>
      </section>

      <footer className="py-12 bg-neutral-950 text-neutral-600 text-xs font-bold uppercase tracking-widest text-center border-t border-neutral-900">
         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <span>© 2026 CreatorIQ Studio</span>
            <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">Documentation</a>
               <a href="#" className="hover:text-white transition-colors">API Status</a>
               <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
         </div>
      </footer>
    </div>
  );
};
