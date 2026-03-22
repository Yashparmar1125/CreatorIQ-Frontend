import React from 'react';
import { usePlannerStore } from '../../../stores/usePlannerStore';

export const PlannerPage: React.FC = () => {
  const { events, addEvent } = usePlannerStore();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 font-sora">Content Planner</h1>
          <p className="text-neutral-500 mt-1">Schedule and manage your production pipeline.</p>
        </div>
        <button 
          onClick={() => addEvent({ id: Date.now(), day: Math.floor(Math.random() * 28) + 1, title: 'Mock Entry', type: 'primary' })}
          className="px-6 py-2.5 bg-brand-600 text-white rounded-xl font-bold shadow-md shadow-brand-600/10 hover:scale-105 active:scale-95 transition-all"
        >
          + New Project
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-neutral-100">
          {days.map(day => (
            <div key={day} className="p-4 text-center text-xs font-bold text-neutral-400 uppercase tracking-widest bg-neutral-50/50">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 h-[600px]">
          {Array.from({ length: 28 }).map((_, i) => {
            const dayNum = i + 1;
            const dayEvents = events.filter(e => e.day === dayNum);
            
            return (
              <div key={i} className="border-r border-b border-neutral-50 p-3 hover:bg-neutral-50/50 transition-colors group relative cursor-pointer min-h-[120px]">
                <span className="text-xs font-bold text-neutral-300 group-hover:text-brand-400 transition-colors">{dayNum}</span>
                <div className="mt-2 space-y-1">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      className={`p-2 text-white text-[10px] font-bold rounded-lg shadow-sm truncate animate-in zoom-in-95 duration-200 ${
                        event.type === 'primary' ? 'bg-brand-600' : 
                        event.type === 'success' ? 'bg-success-600' : 'bg-warning-600'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
