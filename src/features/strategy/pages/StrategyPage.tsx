import React, { useState } from 'react';
import { useStrategyStore } from '../../../stores/useStrategyStore';

export const StrategyPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const { brief, isLoading, generateBrief } = useStrategyStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 font-sora">AI Strategy Lab</h1>
        <p className="text-neutral-500 mt-1">Convert trends into high-performance content briefs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="font-bold text-neutral-800 border-b pb-3 border-neutral-100">Setup Strategy</h3>
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-500 uppercase">Core Topic/Trend</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. React 19 features" 
                className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:ring-2 focus:ring-brand-600/10 outline-none transition-all" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-500 uppercase">Target Audience</label>
              <select className="w-full p-3 rounded-xl border border-neutral-200 text-sm outline-none bg-white">
                <option>Beginner Developers</option>
                <option>Tech Enthusiasts</option>
                <option>Professional Engineers</option>
              </select>
            </div>
            <button 
              onClick={() => topic && generateBrief(topic)}
              disabled={isLoading || !topic}
              className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'AI is Thinking...' : 'Generate Content Brief'}
            </button>
          </div>
          
          <div className="bg-brand-900 p-6 rounded-2xl text-white">
            <h4 className="font-bold mb-2">💡 Quick Tip</h4>
            <p className="text-sm text-white/70 leading-relaxed italic">"Adding specific comparisons (e.g. React vs Vue) often increases CTR by 15-20% for these topics."</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!brief ? (
            <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center opacity-60">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-neutral-300 mb-6">
                  ✨
              </div>
              <h3 className="text-xl font-bold text-neutral-400">Enter a topic to generate your AI brief</h3>
              <p className="text-sm text-neutral-400 mt-2 max-w-xs">We'll provide 10 titles, 3 hook variations, and a full script structure.</p>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm animate-in zoom-in-95 duration-300">
               <h3 className="text-2xl font-bold font-sora text-brand-600 mb-6 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center text-sm">AI</span>
                 Strategy for: {brief.topic}
               </h3>
               
               <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 border-b pb-2 mb-4 uppercase tracking-widest">Viral Title Variations</h4>
                    <div className="space-y-3">
                      {brief.titles.map((t: string, i: number) => (
                        <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 font-bold text-neutral-800 hover:border-brand-300 transition-colors cursor-pointer">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-neutral-400 border-b pb-2 mb-4 uppercase tracking-widest">Recommended Structure</h4>
                    <p className="text-neutral-700 leading-relaxed bg-brand-50/50 p-6 rounded-2xl border border-brand-100 italic">
                      {brief.structure}
                    </p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
