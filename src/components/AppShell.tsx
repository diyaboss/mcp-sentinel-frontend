import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";

export const AppShell: React.FC = () => {
  const location = useLocation();
  const { connected, source } = useEvents();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-charcoal-900 flex text-offwhite font-sans">
      
      {/* Left Navigation Sidebar */}
      <aside className="w-64 border-r border-offwhite/10 flex flex-col shrink-0">
        
        {/* Header */}
        <div className="p-8 border-b border-offwhite/10">
          <Link to="/" className="font-display text-3xl uppercase tracking-widest text-offwhite hover:text-vermilion-500 transition-colors">
            SENTINEL
          </Link>
          <div className="mt-2 text-xs font-mono uppercase tracking-widest text-offwhite-muted">
            Runtime Defense
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-8 flex flex-col gap-6 font-display text-xl uppercase tracking-widest">
          <Link 
            to="/app/live" 
            className={`transition-colors ${isActive('/app/live') ? 'text-vermilion-500' : 'text-offwhite-muted hover:text-offwhite'}`}
          >
            Live
          </Link>
          <Link 
            to="/app/configure" 
            className={`transition-colors ${isActive('/app/configure') ? 'text-vermilion-500' : 'text-offwhite-muted hover:text-offwhite'}`}
          >
            Configure
          </Link>
          <Link 
            to="/app/history" 
            className={`transition-colors ${isActive('/app/history') ? 'text-vermilion-500' : 'text-offwhite-muted hover:text-offwhite'}`}
          >
            History
          </Link>
          <Link 
            to="/app/settings" 
            className={`transition-colors ${isActive('/app/settings') ? 'text-vermilion-500' : 'text-offwhite-muted hover:text-offwhite'}`}
          >
            Settings
          </Link>
        </nav>

        {/* Footer Connections & Links */}
        <div className="p-8 border-t border-offwhite/10 flex flex-col gap-4">
          <div className="font-sans text-xs uppercase tracking-widest text-offwhite-muted flex items-center gap-2">
            <div className={`w-2 h-2 ${connected ? (source === 'mock' ? 'bg-[#f59e0b]' : 'bg-[#10b981]') : 'bg-vermilion-500'} rounded-none`} />
            {connected ? (source === 'mock' ? 'MOCK MODE' : 'LIVE BACKEND') : 'DISCONNECTED'}
          </div>
          
          <Link to="/" className="text-xs font-mono uppercase tracking-widest text-offwhite-muted hover:text-offwhite transition-colors mt-4">
            ← Back to Story
          </Link>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Outlet />
      </main>

    </div>
  );
};
