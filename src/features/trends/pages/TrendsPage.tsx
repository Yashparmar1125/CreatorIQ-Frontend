import React, { useEffect } from 'react';
import { useTrendsStore } from '../../../stores/useTrendsStore';
import { TrendingUp, PlayCircle, Zap, Search, BarChart3, ArrowUpRight } from 'lucide-react';

export const TrendsPage: React.FC = () => {
  const { trends, isLoading, fetchTrends } = useTrendsStore();

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  if (isLoading && trends.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-72 bg-white/50 rounded-[48px] border border-neutral-100 shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div className="max-w-2xl">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-600/10 text-brand-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-brand-600/10">
             <Zap className="w-3 h-3 fill-current" />
             AI Velocity Engine
           </div>
           <h2 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-[-0.04em] font-sora leading-tight">
             Viral <span className="text-neutral-300">Discovery</span>
           </h2>
           <p className="text-neutral-500 font-bold text-lg leading-relaxed mt-4">
             Identify breakout patterns before they saturate. Our neural engine analyzes search intent and competitor velocity in real-time.
           </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative group/search">
            <Search className="w-5 h-5 absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/search:text-brand-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Detect breakout niches..." 
              className="pl-16 pr-8 py-5 bg-white glass border border-white/60 rounded-[24px] text-sm font-black focus:outline-none focus:ring-8 focus:ring-brand-600/5 focus:border-brand-600 transition-all w-80 shadow-2xl shadow-neutral-200/20 placeholder:text-neutral-300"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {trends.map((trend, i) => (
          <div key={i} className="glass p-12 rounded-[56px] border border-white/60 premium-shadow-hover group cursor-pointer relative overflow-hidden flex flex-col min-h-[420px]">
             <div className="absolute top-0 right-0 p-12">
                <div className="w-16 h-16 rounded-[24px] bg-neutral-900 flex items-center justify-center text-white group-hover:bg-brand-600 transition-all duration-700 shadow-2xl group-hover:rotate-12 group-hover:scale-110">
                   <TrendingUp className="w-8 h-8" />
                </div>
             </div>

             <div className="mb-12 flex-1">
                <div className="flex gap-2 flex-wrap mb-8">
                  {trend.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-black text-brand-600 uppercase tracking-widest bg-brand-50 border border-brand-100/50 px-4 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-black font-sora text-neutral-900 leading-tight tracking-tighter group-hover:text-brand-600 transition-colors pr-24">
                  {trend.title}
                </h3>
             </div>

             <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-neutral-100">
                <div>
                  <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                    <BarChart3 className="w-3 h-3" />
                    Market Velocity
                  </p>
                  <p className="text-4xl font-black text-neutral-900 font-sora flex items-center gap-3">
                    {trend.velocity}
                    <ArrowUpRight className="w-6 h-6 text-success-600 animate-bounce" />
                  </p>
                </div>
                <div className="flex items-end justify-end">
                   <div className="flex -space-x-5">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="w-14 h-14 rounded-2xl border-4 border-white bg-neutral-100 shadow-2xl overflow-hidden relative group/avatar rotate-[-5deg] group-hover:rotate-0 transition-all duration-500">
                           <img src={`https://i.pravatar.cc/150?img=${n + (i * 5)}`} className="w-full h-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all scale-110" alt="Analyst" />
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Neural Forecast</p>
                   <p className="text-2xl font-black text-neutral-900 font-mono tracking-tighter">{trend.volume}</p>
                </div>
                <button className="flex items-center gap-4 px-10 py-5 bg-neutral-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-brand-600 hover:scale-105 transition-all shadow-2xl shadow-neutral-900/10 active:scale-95 group/btn overflow-hidden relative">
                   <span className="relative z-10">Map Blueprints</span>
                   <PlayCircle className="w-6 h-6 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                   <div className="absolute inset-0 bg-brand-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
             </div>

             <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-50 overflow-hidden">
                <div className="h-full bg-brand-600 w-1/4 animate-[shimmer_3s_infinite]" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
