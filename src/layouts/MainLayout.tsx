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
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-brand-900 text-white transition-all duration-300 z-50 flex flex-col",
          isSidebarCollapsed ? "w-16" : "w-60"
        )}
      >
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center font-bold text-lg">
              C
            </div>
            {!isSidebarCollapsed && (
              <span className="font-sora font-bold text-xl tracking-tight">
                CreatorIQ
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 p-3 rounded-lg transition-colors group relative",
                isActive 
                  ? "bg-brand-700 text-white" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isSidebarCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
              {isSidebarCollapsed && (
                <div className="absolute left-14 bg-brand-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/10">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-2">
          <NavLink
            to="/app/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors group relative",
              isActive 
                ? "bg-brand-700 text-white" 
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && (
              <span className="font-medium text-sm">Settings</span>
            )}
          </NavLink>

          <button
            onClick={() => useAuthStore.getState().logout()}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-white/40 hover:text-white transition-colors mt-2"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 mx-auto" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarCollapsed ? "pl-16" : "pl-60"
        )}
      >
        {/* Top Bar */}
        <header className="h-16 fixed top-0 right-0 left-0 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-40 transition-all duration-300 flex items-center px-8 justify-between"
          style={{ paddingLeft: isSidebarCollapsed ? 'calc(4rem + 2rem)' : 'calc(15rem + 2rem)' }}
        >
          <div className="flex items-center gap-8 flex-1 max-w-2xl">
            <h1 className="text-xl font-bold font-sora hidden sm:block">Dashboard</h1>
            <div className="relative flex-1 group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-700 transition-colors" />
              <input 
                type="text" 
                placeholder="Search metrics, trends, ideas... (Cmd+K)" 
                className="w-full bg-neutral-50 border border-neutral-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-neutral-500 hover:text-brand-700 hover:bg-brand-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-neutral-500 hover:text-brand-700 hover:bg-brand-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-neutral-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold leading-tight">Yash</p>
                <p className="text-xs text-brand-700 font-medium">Pro Plan</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-100 border-2 border-brand-700 flex items-center justify-center text-brand-700 transition-transform group-hover:scale-105">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-24 p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
