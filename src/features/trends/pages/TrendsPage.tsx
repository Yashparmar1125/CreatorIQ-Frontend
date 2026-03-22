import React, { useEffect } from 'react';
import { useTrendsStore } from '../../../stores/useTrendsStore';

export const TrendsPage: React.FC = () => {
  const { trends, isLoading, fetchTrends } = useTrendsStore();

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  if (isLoading && trends.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-48 bg-white rounded-2xl border border-neutral-100 shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-sora">Trend Discovery</h1>
          <p className="text-neutral-500 mt-1">Identify breakout topics before they peak.</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Search niche..." 
            className="px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-600/20 outline-none text-sm transition-all w-64"
          />
          <button className="px-6 py-2 bg-brand-600 text-white rounded-xl font-bold text-sm">Filter</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trends.map((trend, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:border-brand-300 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">{trend.title}</h3>
                <div className="flex gap-2">
                  {trend.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-neutral-400">Velocity</p>
                <p className="text-lg font-bold text-success-600 font-mono">{trend.velocity}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 pt-4 border-t border-neutral-50">
              <div>
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-tighter">Search Volume</p>
                <p className="text-sm font-bold text-neutral-700 font-mono">{trend.volume}</p>
              </div>
              <div className="flex-1 h-8 flex items-end gap-1">
                {[4, 6, 3, 8, 5, 9, 7].map((h, j) => (
                   <div key={j} className="flex-1 bg-brand-100 rounded-t-sm group-hover:bg-brand-200 transition-colors" style={{ height: `${h * 10}%` }} />
                ))}
              </div>
              <button className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors">
                Generate Brief
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
