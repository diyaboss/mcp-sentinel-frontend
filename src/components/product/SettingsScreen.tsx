import React from "react";
import { useEvents } from "../../hooks/useEvents";

export const SettingsScreen: React.FC = () => {
  const { source } = useEvents();

  return (
    <div className="flex-1 overflow-y-auto bg-charcoal-800 p-8 lg:p-12">
      <div className="max-w-3xl">
        
        <h1 className="font-display text-4xl uppercase tracking-widest text-offwhite mb-12">Operational Settings</h1>

        <section className="bg-charcoal-900 border border-offwhite/10 flex flex-col">
          
          <div className="p-6 border-b border-offwhite/10 flex justify-between items-center">
            <div className="font-mono text-xs uppercase tracking-widest text-offwhite-muted w-48 shrink-0">Backend Endpoint</div>
            <div className="font-mono text-sm text-offwhite bg-charcoal-800 px-4 py-2 w-full truncate">
              http://localhost:8000
            </div>
          </div>

          <div className="p-6 border-b border-offwhite/10 flex justify-between items-center">
            <div className="font-mono text-xs uppercase tracking-widest text-offwhite-muted w-48 shrink-0">WebSocket URL</div>
            <div className="font-mono text-sm text-offwhite bg-charcoal-800 px-4 py-2 w-full truncate">
              {import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws"}
            </div>
          </div>

          <div className="p-6 border-b border-offwhite/10 flex justify-between items-center">
            <div className="font-mono text-xs uppercase tracking-widest text-offwhite-muted w-48 shrink-0">Current Mode</div>
            <div className="font-mono text-sm uppercase font-bold tracking-widest px-4 py-2 w-full">
              {source === 'mock' ? <span className="text-[#f59e0b]">Simulated / Mock</span> : <span className="text-[#10b981]">Live Connected</span>}
            </div>
          </div>

          <div className="p-6 flex justify-between items-center">
            <div className="font-mono text-xs uppercase tracking-widest text-offwhite-muted w-48 shrink-0">Environment</div>
            <div className="font-mono text-sm text-offwhite bg-charcoal-800 px-4 py-2 w-full truncate uppercase tracking-widest">
              {import.meta.env.MODE}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};
