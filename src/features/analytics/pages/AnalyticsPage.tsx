import React, { useEffect } from 'react';
import { useAnalyticsStore } from '../../../stores/useAnalyticsStore';

export const AnalyticsPage: React.FC = () => {
  const { retentionData, isLoading, fetchAnalytics } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (isLoading && !retentionData) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-64 bg-neutral-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 h-96 bg-white rounded-3xl" />
           <div className="h-96 bg-white rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 font-sora">Performance Analytics</h1>
        <p className="text-neutral-500 mt-1">Deep-dive into your growth metrics and audience retention.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm relative overflow-hidden">
             <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-neutral-800">Retention Heatmap</h3>
               <select className="text-xs font-bold border rounded-lg p-1 px-2 outline-none">
                 <option>Last Video</option>
                 <option>Global Average</option>
               </select>
             </div>
             <div className="h-48 w-full bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-center text-neutral-300">
                Retention Graph Placeholder (Interactive)
             </div>
             <div className="mt-6 flex gap-4">
                <div className="flex-1 p-4 bg-brand-50 rounded-2xl border border-brand-100">
                  <p className="text-[10px] uppercase font-bold text-brand-700">Intro Hook</p>
                  <p className="text-lg font-bold text-brand-900">{retentionData?.intro}% <span className="text-xs font-medium text-brand-500">retained</span></p>
                </div>
                <div className="flex-1 p-4 bg-success-50 rounded-2xl border border-success-100">
                  <p className="text-[10px] uppercase font-bold text-success-700">Value delivery</p>
                  <p className="text-lg font-bold text-success-900">{retentionData?.value}% <span className="text-xs font-medium text-success-500">retained</span></p>
                </div>
                <div className="flex-1 p-4 bg-error-50 rounded-2xl border border-error-100">
                  <p className="text-[10px] uppercase font-bold text-error-700">Outro Drop</p>
                  <p className="text-lg font-bold text-error-900">{retentionData?.outro}% <span className="text-xs font-medium text-error-500">at 12:40</span></p>
                </div>
             </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm">
             <h3 className="font-bold text-neutral-800 mb-6 underline decoration-brand-500 underline-offset-4">Top Playlists</h3>
             <div className="space-y-4">
               {[1, 2, 3, 4].map(k => (
                 <div key={k} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neutral-100 rounded-lg" />
                      <p className="text-sm font-bold text-neutral-700">React Mastery</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">12.{k}K</span>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
