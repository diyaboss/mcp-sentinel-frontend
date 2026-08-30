import React, { useState } from "react";
import type { SentinelEvent, GuardStatus } from "../../types/event";
import { ConsoleEventStream } from "./ConsoleEventStream";
import { ConsoleEventDetail } from "./ConsoleEventDetail";
import { useEvents } from "../../hooks/useEvents";

export const LiveConsole: React.FC = () => {
  const { events, connected, source, toggleSource, guard, toggleGuard } = useEvents();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  
  const selectedEvent = events.find(e => e.id === selectedId) || events[0] || null;

  return (
    <div className="flex w-full h-full">
      {/* LEFT: Live Event Stream (40%) */}
      <div className="w-[40%] min-w-[400px] border-r border-offwhite/10 flex flex-col h-full bg-charcoal-800">
        <div className="shrink-0 px-6 py-4 border-b border-offwhite/10 flex items-center justify-between">
          <div className="font-sans text-xs uppercase tracking-widest text-offwhite-muted flex items-center gap-2">
            <div className={`w-2 h-2 ${connected ? (source === 'mock' ? 'bg-[#f59e0b]' : 'bg-[#10b981]') : 'bg-vermilion-500'} rounded-none`} />
            {connected ? (source === 'mock' ? 'MOCK MODE' : 'LIVE WS') : 'DISCONNECTED'}
          </div>
          
          <button 
            onClick={toggleSource}
            className="text-xs font-mono uppercase text-offwhite-muted hover:text-offwhite transition-colors"
          >
            Switch to {source === 'mock' ? 'Live' : 'Mock'}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <ConsoleEventStream events={events} selectedId={selectedEvent?.id} onSelect={setSelectedId} />
        </div>
      </div>

      {/* RIGHT: Detail View (60%) */}
      <div className="flex-1 h-full overflow-y-auto bg-charcoal-900">
        {selectedEvent ? (
          <ConsoleEventDetail event={selectedEvent} />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-display text-4xl text-offwhite/10 tracking-tightest">
            NO EVENTS
          </div>
        )}
      </div>
    </div>
  );
};
