import React from 'react';
import { useTrendsStore } from '../../../stores/useTrendsStore';
import type { UsernameInsightsResponse } from '../../../lib/api';
import { TrendingUp, PlayCircle, Zap, Search, BarChart3, ArrowUpRight, LoaderCircle } from 'lucide-react';

export const TrendsPage: React.FC = () => {
  const {
    trends,
    username,
    detectedGenre,
    channelTitle,
    isLoading,
    error,
    llmResponse,
    setUsername,
    fetchTrends,
  } = useTrendsStore();

  const llm = llmResponse as UsernameInsightsResponse['llm'] | null;

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter YouTube username (@optional)..." 
              className="pl-16 pr-8 py-5 bg-white glass border border-white/60 rounded-[24px] text-sm font-black focus:outline-none focus:ring-8 focus:ring-brand-600/5 focus:border-brand-600 transition-all w-80 shadow-2xl shadow-neutral-200/20 placeholder:text-neutral-300"
            />
          </div>
          <button
            onClick={() => {
              void fetchTrends(username);
            }}
            disabled={isLoading}
            className="px-6 py-5 rounded-[24px] bg-neutral-900 text-white text-xs font-black uppercase tracking-widest hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Analyzing...
              </span>
            ) : 'Analyze'}
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="rounded-2xl border border-brand-100 bg-brand-50/40 px-5 py-4 text-sm font-bold text-brand-700">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-6 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
            Pulling channel genre, trend seeds, and LLM forecast...
          </div>
        </div>
      ) : null}

      {detectedGenre ? (
        <div className="rounded-2xl border border-brand-100 bg-brand-50/50 px-5 py-3 text-sm font-bold text-brand-700">
          Channel: {channelTitle || username} | Detected Genre: {detectedGenre}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-warning-200 bg-warning-50 px-5 py-3 text-sm font-bold text-warning-700">
          {error}
        </div>
      ) : null}

      {llmResponse ? (
        <details className="rounded-2xl border border-neutral-200 bg-white/70 px-5 py-4">
          <summary className="cursor-pointer text-sm font-black uppercase tracking-widest text-neutral-700">
            View LLM Response JSON
          </summary>
          <pre className="mt-4 text-xs text-neutral-700 overflow-auto whitespace-pre-wrap">
            {JSON.stringify(llmResponse, null, 2)}
          </pre>
        </details>
      ) : null}

      {llm?.final_recommended_topics && llm.final_recommended_topics.length > 0 ? (
        <section className="space-y-4">
          <h3 className="text-xl font-black font-sora text-neutral-900 tracking-tight">Final Recommended Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {llm.final_recommended_topics.map((item, idx) => (
              <article key={`${item.title}-${idx}`} className="bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-600 mb-2">Rank {idx + 1}</p>
                <h4 className="text-lg font-black text-neutral-900 leading-tight">{item.title}</h4>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-neutral-50 border border-neutral-100 py-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Virality</p>
                    <p className="text-lg font-black text-neutral-900">{item.predicted_virality_score}</p>
                  </div>
                  <div className="rounded-xl bg-neutral-50 border border-neutral-100 py-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Trend In</p>
                    <p className="text-lg font-black text-neutral-900">{item.time_to_trend_days}d</p>
                  </div>
                  <div className="rounded-xl bg-neutral-50 border border-neutral-100 py-2">
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Confidence</p>
                    <p className="text-sm font-black text-neutral-900">{item.confidence_level}</p>
                  </div>
                </div>
                {item.explanation ? (
                  <div className="mt-4 space-y-2 text-xs font-bold text-neutral-600">
                    <p>Trends Weight: {item.explanation.trends_weight_percent ?? 0}%</p>
                    <p>Genre Weight: {item.explanation.genre_weight_percent ?? 0}%</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm">
          <h4 className="text-sm font-black uppercase tracking-widest text-neutral-500 mb-3">Hidden Layer Insights</h4>
          {llm?.hidden_layer_insights && llm.hidden_layer_insights.length > 0 ? (
            <ul className="space-y-2 text-sm font-bold text-neutral-700">
              {llm.hidden_layer_insights.map((insight, idx) => (
                <li key={`${insight}-${idx}`} className="leading-relaxed">• {insight}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-bold text-neutral-400">No hidden insights yet.</p>
          )}
        </div>

        <div className="lg:col-span-1 bg-white border border-neutral-100 rounded-3xl p-6 shadow-sm">
          <h4 className="text-sm font-black uppercase tracking-widest text-neutral-500 mb-3">Rejected Candidates</h4>
          {llm?.rejected_candidates && llm.rejected_candidates.length > 0 ? (
            <div className="space-y-3">
              {llm.rejected_candidates.map((item, idx) => (
                <div key={`${item.title}-${idx}`} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-3">
                  <p className="text-sm font-black text-neutral-800">{item.title}</p>
                  <p className="text-xs font-bold text-neutral-500 mt-1">{item.reason}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-bold text-neutral-400">No rejected candidates yet.</p>
          )}
        </div>

        <div className="lg:col-span-1 bg-neutral-900 text-white rounded-3xl p-6 shadow-sm">
          <h4 className="text-sm font-black uppercase tracking-widest text-neutral-300 mb-3">Strategic Insights</h4>
          {llm?.strategic_insights ? (
            <div className="space-y-3 text-sm">
              <p><span className="font-black text-brand-300">Pattern:</span> {llm.strategic_insights.emerging_pattern || 'N/A'}</p>
              <p><span className="font-black text-brand-300">Next 7 Days:</span> {llm.strategic_insights.focus_next_7_days || 'N/A'}</p>
            </div>
          ) : (
            <p className="text-sm font-bold text-neutral-400">No strategic insight yet.</p>
          )}
        </div>
      </section>

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
