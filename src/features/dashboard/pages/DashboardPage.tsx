import React, { useEffect } from 'react';
import { useDashboardStore } from '../../../stores/useDashboardStore';
import { useTrendsStore } from '../../../stores/useTrendsStore';
import type { UsernameInsightsResponse } from '../../../lib/api';
import { BarChart2, Calendar, ChevronRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { stats, insights, isLoading, fetchDashboard } = useDashboardStore();
  const { history, clearHistory } = useTrendsStore();
  const latestHistory = history[0];
  const latestLlm = (latestHistory?.llmResponse ?? null) as UsernameInsightsResponse['llm'] | null;

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading && stats.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-48 bg-white/50 rounded-[32px] border border-neutral-100 shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/5 text-brand-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-brand-600/10">
             <Activity className="w-3 h-3" />
             Live Activity
           </div>
           <h2 className="text-3xl font-bold text-neutral-900 tracking-tight font-sora">
             Hey, <span className="text-neutral-400">Yash</span>
           </h2>
           <p className="text-neutral-500 text-sm font-medium">
             Your performance is <span className="text-brand-600 font-bold">14.2% up</span> this week.
           </p>
        </div>
        
        <div className="flex gap-3">
           <button className="px-5 py-2.5 bg-white border border-neutral-200 rounded-xl font-bold text-xs shadow-sm hover:bg-neutral-50 transition-all flex items-center gap-2">
             <Calendar className="w-3.5 h-3.5 text-neutral-400" />
             Report
           </button>
           <button className="px-5 py-2.5 bg-neutral-900 text-white rounded-xl font-bold text-xs shadow-lg hover:bg-neutral-800 transition-all">
             Strategy
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-bold font-sora text-neutral-900 tracking-tight">{stat.value}</h3>
               </div>
               <div className="p-2.5 rounded-xl bg-neutral-50 text-neutral-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                 {stat.icon}
               </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
               <div className="inline-flex items-center gap-1 text-success-600 text-[10px] font-bold">
                 <TrendingUp className="w-3 h-3" />
                 {stat.trend}
               </div>
               <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(dot => <div key={dot} className={`w-1 h-2 rounded-full ${dot <= 3 ? 'bg-brand-600' : 'bg-neutral-100'}`} />)}
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
           <div className="flex items-center justify-between gap-6 mb-8">
             <div className="space-y-0.5">
               <h3 className="text-xl font-bold font-sora text-neutral-900 tracking-tight">Growth Projection</h3>
               <p className="text-neutral-400 text-xs font-medium">Estimated growth based on current video data</p>
             </div>
             <div className="flex p-1 bg-neutral-50 rounded-xl border border-neutral-100">
               {['28d', '90d', 'ALL'].map(tab => (
                 <button key={tab} className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${tab === '28d' ? 'bg-white text-neutral-900 shadow-sm border border-neutral-100' : 'text-neutral-500 hover:text-neutral-900'}`}>
                   {tab}
                 </button>
               ))}
             </div>
           </div>
           
           <div className="relative h-64 w-full bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col items-center justify-center overflow-hidden">
             <BarChart2 className="w-12 h-12 text-neutral-200" />
             <p className="text-sm font-bold font-sora text-neutral-300 mt-4">Syncing Data...</p>
             
             <div className="absolute bottom-8 left-8 right-8 h-20 flex items-end justify-between px-2 pointer-events-none">
                {[40, 70, 45, 90, 65, 80, 55, 100, 75, 40].map((h, i) => (
                  <div key={i} className="w-1 bg-brand-600/10 rounded-full transition-all duration-1000 group-hover:bg-brand-600/30" style={{ height: `${h}%` }} />
                ))}
             </div>
           </div>
        </div>

        <div className="lg:col-span-4 bg-neutral-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col group">
           <div className="relative z-10 flex-1">
             <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-400 border border-white/5">
                 <Sparkles className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="text-lg font-bold font-sora tracking-tight">AI Insights</h3>
                 <p className="text-[10px] font-bold text-brand-500 uppercase tracking-wider mt-0.5">3 Actions Available</p>
               </div>
             </div>
             
             <div className="space-y-4">
               {insights.map((item, j) => (
                 <div key={j} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer flex flex-col gap-2 group/item">
                   <div className="flex items-center justify-between">
                      <div className="px-2 py-0.5 bg-white/10 rounded-md text-[9px] font-bold text-white uppercase tracking-wider border border-white/5">
                         Priority {j + 1}
                      </div>
                      <ChevronRight className="w-3 h-3 text-neutral-600 group-hover/item:text-white transition-all" />
                   </div>
                   <p className="text-xs font-bold text-neutral-200 leading-snug">{item.title}</p>
                   <div className="flex items-center gap-1.5">
                     <div className="w-1 h-1 rounded-full bg-success-500" />
                     <p className="text-[8px] text-neutral-500 font-bold uppercase tracking-wider">{item.impact}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
           
           <button className="w-full mt-8 py-3.5 bg-white text-neutral-900 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-neutral-100 transition-all shadow-lg">
              View Insights
           </button>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold font-sora text-neutral-900 tracking-tight">Trend History</h3>
              <p className="text-xs font-medium text-neutral-400 mt-1">Stored in localStorage</p>
            </div>
            <button
              onClick={clearHistory}
              className="px-3 py-2 rounded-lg border border-neutral-200 text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:bg-neutral-50"
            >
              Clear
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-sm font-bold text-neutral-400">No trend requests yet. Run Analyze in Trends page.</p>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
              {history.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/50">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-neutral-900">{item.channelTitle || item.username}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {new Date(item.requestedAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs font-bold text-brand-600 mt-1">Genre: {item.detectedGenre || 'Unknown'}</p>
                  {item.error ? (
                    <p className="text-[11px] font-bold text-warning-700 mt-2">Error: {item.error}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-7 bg-neutral-900 p-8 rounded-3xl shadow-xl text-white">
          <h3 className="text-xl font-bold font-sora tracking-tight">Latest Forecast JSON</h3>
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-1 mb-4">
            Raw LLM + trend payload for debugging and dashboard rendering
          </p>

          <div className="rounded-2xl bg-black/20 border border-white/10 p-4 max-h-[420px] overflow-auto">
            <pre className="text-xs text-neutral-200 whitespace-pre-wrap">
              {latestHistory ? JSON.stringify({
                username: latestHistory.username,
                channelTitle: latestHistory.channelTitle,
                detectedGenre: latestHistory.detectedGenre,
                seedTopics: latestHistory.seedTopics,
                trends: latestHistory.trends,
                llmResponse: latestHistory.llmResponse,
                error: latestHistory.error,
              }, null, 2) : 'No data yet.'}
            </pre>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
          <h3 className="text-xl font-bold font-sora text-neutral-900 tracking-tight">Latest Recommended Topics</h3>
          <p className="text-xs font-medium text-neutral-400 mt-1 mb-5">Parsed from latest LLM response</p>

          {latestLlm?.final_recommended_topics && latestLlm.final_recommended_topics.length > 0 ? (
            <div className="space-y-3">
              {latestLlm.final_recommended_topics.map((topic, idx) => (
                <div key={`${topic.title}-${idx}`} className="rounded-2xl border border-neutral-100 p-4 bg-neutral-50/50">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-black text-neutral-900">{topic.title}</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-neutral-500">
                      <span>Score {topic.predicted_virality_score}</span>
                      <span>•</span>
                      <span>{topic.time_to_trend_days}d</span>
                      <span>•</span>
                      <span>{topic.confidence_level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-bold text-neutral-400">No recommended topics yet.</p>
          )}
        </div>

        <div className="lg:col-span-4 bg-neutral-900 p-8 rounded-3xl shadow-xl text-white">
          <h3 className="text-lg font-bold font-sora tracking-tight">LLM Strategy Snapshot</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-1 mb-4">Live summary</p>

          <div className="space-y-4 text-sm">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-400 mb-2">Emerging Pattern</p>
              <p className="font-bold text-neutral-100">{latestLlm?.strategic_insights?.emerging_pattern || 'No pattern yet.'}</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-400 mb-2">Focus Next 7 Days</p>
              <p className="font-bold text-neutral-100">{latestLlm?.strategic_insights?.focus_next_7_days || 'No focus guidance yet.'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import { Activity, TrendingUp, Sparkles } from 'lucide-react';
