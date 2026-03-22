import React, { useState } from 'react';
import { useStrategyStore } from '../../../stores/useStrategyStore';
import { Sparkles, Copy, Check, Info, Lightbulb, Target, Layout } from 'lucide-react';

export const StrategyPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [copied, setCopied] = useState<number | null>(null);
  const { brief, isLoading, generateBrief } = useStrategyStore();

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="max-w-2xl">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/5 text-brand-600 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-4 border border-brand-600/10">
           <Sparkles className="w-3 h-3 fill-current" />
           Content Strategy
         </div>
         <h2 className="text-3xl font-bold text-neutral-900 tracking-tight font-sora leading-tight">
           Content <span className="text-neutral-400">Planner</span>
         </h2>
         <p className="text-neutral-500 text-sm font-medium mt-2">
           Transform trends into content briefs. Draft high-CTR titles and engagement-focused structures.
         </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 to-accent-500" />
            
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider pl-1">Topic</label>
                <div className="relative group/input">
                  <Lightbulb className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/input:text-brand-600 transition-colors" />
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Future of AI 2026" 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white text-sm font-bold focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600/20 transition-all outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider pl-1">Target Audience</label>
                <div className="relative group/select">
                  <Target className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within/select:text-brand-600 transition-colors" />
                  <select className="w-full pl-11 pr-8 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white text-sm font-bold focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600/20 transition-all outline-none appearance-none">
                    <option>Early Adopters</option>
                    <option>Technical Creators</option>
                    <option>General Tech Consumers</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              onClick={() => topic && generateBrief(topic)}
              disabled={isLoading || !topic}
              className="w-full py-4 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-neutral-800 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                   <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
                </div>
              ) : (
                "Generate Brief"
              )}
            </button>
          </div>
          
          <div className="bg-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden group">
             <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/5">
                   <Info className="w-5 h-5 text-brand-400" />
                </div>
                <h4 className="text-lg font-bold font-sora mb-2 tracking-tight">Quick Tip</h4>
                <p className="text-neutral-400 leading-relaxed font-medium text-xs">
                  Contrarian hooks are performing <span className="text-white font-bold">24% better</span> in your niche this week.
                </p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {!brief ? (
            <div className="h-full min-h-[400px] border-2 border-dashed border-neutral-100 rounded-[32px] flex flex-col items-center justify-center text-center p-12 bg-neutral-50/30">
               <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-4xl mb-6">
                  🪄
               </div>
               <h3 className="text-xl font-bold text-neutral-900 font-sora tracking-tight">
                 Enter a topic
               </h3>
               <p className="text-neutral-400 font-medium mt-2 max-w-xs text-sm leading-relaxed">
                 We'll generate data-backed titles and a suggested structure for your next video.
               </p>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-[40px] border border-neutral-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10">
                  <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400">
                     <Layout className="w-6 h-6" />
                  </div>
               </div>

               <div className="space-y-12">
                  <section>
                    <div className="mb-10">
                       <p className="text-[10px] font-bold text-brand-600 uppercase tracking-wider mb-2">Content Map</p>
                       <h4 className="text-3xl font-bold font-sora text-neutral-900 tracking-tight">
                         {brief.topic}
                       </h4>
                    </div>
                  
                    <div className="flex items-center justify-between mb-6 border-b border-neutral-50 pb-4">
                       <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                         Recommended Titles
                       </h5>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {brief.titles.map((t: string, i: number) => (
                        <div key={i} className="group flex items-center justify-between gap-6 p-6 bg-neutral-50 rounded-2xl border border-transparent hover:border-brand-200 hover:bg-white transition-all">
                          <p className="text-base font-bold text-neutral-800 leading-tight flex-1">{t}</p>
                          <button 
                            onClick={() => handleCopy(t, i)}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
                          >
                            {copied === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-neutral-400 group-hover:text-white" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-6 border-b border-neutral-50 pb-4">
                       Video Structure
                    </h5>
                    <div className="p-8 bg-neutral-900 rounded-2xl text-white/90 shadow-lg">
                       <p className="text-lg leading-relaxed font-medium text-neutral-200">
                          {brief.structure}
                       </p>
                    </div>
                  </section>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
