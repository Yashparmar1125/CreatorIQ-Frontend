import React, { useEffect } from 'react';
import { useDashboardStore } from '../../../stores/useDashboardStore';

export const DashboardPage: React.FC = () => {
  const { stats, insights, isLoading, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading && stats.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-40 bg-white rounded-2xl border border-neutral-100 shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 group-hover:bg-brand-600 group-hover:text-white transition-colors text-xl">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-success-600 bg-success-600/10 px-2 py-1 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="text-neutral-600 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold font-mono mt-1 text-neutral-900">{stat.value}</h3>
            <div className="h-1.5 mt-4 w-full bg-neutral-100 rounded-full overflow-hidden">
               <div className="h-full bg-brand-600 w-2/3 group-hover:w-full transition-all duration-1000" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 overflow-hidden relative">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold font-sora text-neutral-900">Performance Over Time</h3>
             <div className="flex gap-2">
               <button className="px-3 py-1 text-xs font-bold bg-brand-600 text-white rounded-full">Last 28 days</button>
               <button className="px-3 py-1 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">Last 90 days</button>
             </div>
           </div>
           <div className="h-64 flex flex-col items-center justify-center text-neutral-400 border-2 border-dashed border-neutral-100 rounded-xl bg-neutral-50/50">
             <BarChart2 className="w-12 h-12 mb-2 opacity-20" />
             <p className="text-sm font-medium">Chart Visualization Layer</p>
             <p className="text-xs">Connecting to YouTube Analytics API...</p>
           </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden group border border-neutral-800">
           <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-600/20 rounded-full blur-3xl" />
           <div className="relative z-10">
             <h3 className="text-xl font-bold font-sora mb-2">AI Smart Insights</h3>
             <p className="text-neutral-400 text-sm mb-6 italic leading-relaxed">
               "Your 'Tech Review' series is outperforming expectations. Consider a follow-up on the latest M3 chips."
             </p>
             
             <div className="space-y-4">
               {insights.map((item, j) => (
                 <div key={j} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-brand-600/20 flex items-center justify-center text-brand-500 text-xs font-bold">
                     {j + 1}
                   </div>
                   <div>
                      <p className="text-sm font-bold leading-tight truncate">{item.title}</p>
                      <p className="text-[10px] text-neutral-500 font-mono">Potential Impact: {item.impact}</p>
                   </div>
                 </div>
               ))}
             </div>
             
             <button className="w-full mt-8 py-3 bg-white text-neutral-900 rounded-xl font-bold text-sm hover:bg-neutral-100 active:scale-95 transition-all">
               Generate Smart Strategy
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const BarChart2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
