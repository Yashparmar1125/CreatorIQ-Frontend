import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Lightbulb, 
  Calendar, 
  BarChart2, 
  Settings, 
  Youtube,
  Search,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard' },
  { name: 'Trends', icon: TrendingUp, href: '/app/trends' },
  { name: 'Strategy', icon: Lightbulb, href: '/app/strategy' },
  { name: 'Planner', icon: Calendar, href: '/app/planner' },
  { name: 'Analytics', icon: BarChart2, href: '/app/analytics' },
  { name: 'Channels', icon: Youtube, href: '/app/channels' },
];

export const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-white text-neutral-900 font-sans selection:bg-brand-600/10 transition-colors duration-500 overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-brand-600/5 blur-[120px] rounded-full animate-breathe" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-500/5 blur-[150px] rounded-full animate-breathe delay-1000" />
      </div>

      {/* Sidebar - Pro Dark Glass */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-neutral-950 text-white transition-all duration-700 z-50 flex flex-col shadow-2xl overflow-hidden group",
          isSidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        <div className="absolute inset-0 bg-brand-600/5 blur-3xl opacity-20 pointer-events-none" />
        
        <div className="h-20 flex items-center px-6 relative z-10 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-lg shadow-xl shadow-brand-600/20 transition-all duration-500">
              C
            </div>
            {!isSidebarCollapsed && (
              <span className="font-sora font-extrabold text-xl tracking-tighter">
                Creator<span className="text-neutral-500">IQ</span>
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto relative z-10 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-white/5 text-white shadow-sm border border-white/5" 
                  : "text-neutral-500 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn(
                    "w-4 h-4 flex-shrink-0 transition-transform duration-200",
                    isActive ? "text-brand-500" : "group-hover:text-neutral-300"
                  )} />
                  {!isSidebarCollapsed && (
                    <span className="text-[13px] font-medium tracking-tight">{item.name}</span>
                  )}
                  {isSidebarCollapsed && (
                    <div className="absolute left-16 bg-neutral-900 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 border border-white/10 translate-x-2 group-hover:translate-x-0">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 relative z-10 border-t border-white/5 space-y-2">
          <NavLink
            to="/app/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
              isActive ? "bg-white/5 text-white" : "text-neutral-500 hover:text-white"
            )}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {!isSidebarCollapsed && (
              <span className="text-[13px] font-medium tracking-tight">Settings</span>
            )}
          </NavLink>

          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              onClick={() => useAuthStore.getState().logout()}
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl text-neutral-500 hover:bg-red-500/10 hover:text-red-400 transition-all border border-white/5 group"
            >
              <LogOut className="w-4 h-4" />
              {!isSidebarCollapsed && <span className="text-[12px] font-medium">Logout</span>}
            </button>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-3 rounded-xl bg-white/5 text-neutral-500 hover:text-white transition-all border border-white/5"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex-1 transition-all duration-700 relative",
          isSidebarCollapsed ? "pl-20" : "pl-72"
        )}
      >
        {/* Top Bar - Clean Glass */}
        <header className={cn(
          "h-20 fixed top-0 right-0 z-40 transition-all duration-700 flex items-center px-8 justify-between bg-white/80 backdrop-blur-md border-b border-neutral-100",
          isSidebarCollapsed ? "left-20" : "left-72"
        )}>
          <div className="flex items-center gap-8 flex-1 max-w-2xl">
            <div className="relative flex-1 group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search videos, trends or creators..." 
                className="w-full bg-neutral-100/50 border border-neutral-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-600/5 focus:border-brand-600/20 transition-all placeholder:text-neutral-400"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400 bg-white px-1.5 py-0.5 rounded border border-neutral-200 pointer-events-none">
                ⌘K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 bg-neutral-50 rounded-xl border border-neutral-100">
               <button className="p-2 text-neutral-500 hover:text-brand-600 rounded-lg hover:bg-white transition-all relative">
                 <Bell className="w-4 h-4" />
                 <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-600 rounded-full border-2 border-white"></span>
               </button>
               <button className="p-2 text-neutral-500 hover:text-brand-600 rounded-lg hover:bg-white transition-all">
                 <HelpCircle className="w-4 h-4" />
               </button>
            </div>
            
            <div className="h-8 w-px bg-neutral-200 mx-2"></div>
            
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden xl:block">
                <p className="text-sm font-bold text-neutral-900 leading-none">Yash Parmar</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1">Pro Account</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center border-2 border-white shadow-lg transition-all group-hover:scale-105 overflow-hidden">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content handles its own scrolling */}
        <main className="pt-20 h-screen overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto p-8">
            <Outlet />
          </div>
          
          {/* Subtle Page Footer Decor */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-600/5 blur-[100px] rounded-full -mr-48 -mb-48 pointer-events-none" />
        </main>
      </div>
    </div>
  );
};
