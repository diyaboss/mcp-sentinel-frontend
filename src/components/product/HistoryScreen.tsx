import React, { useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { ConsoleEventDetail } from "../console/ConsoleEventDetail";

export const HistoryScreen: React.FC = () => {
  const { events } = useEvents();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvent = events.find(e => e.id === selectedId) || null;

  return (
    <div className="flex w-full h-full">
      {/* LEFT: Event List */}
      <div className="w-[50%] min-w-[500px] border-r border-offwhite/10 flex flex-col h-full bg-charcoal-800">
        <div className="shrink-0 px-6 py-4 border-b border-offwhite/10">
          <h1 className="font-display text-2xl uppercase tracking-widest text-offwhite">Audit History</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedId(event.id)}
              className={`w-full text-left p-4 border-b border-offwhite/5 hover:bg-charcoal-900 transition-colors flex gap-4 ${selectedId === event.id ? 'bg-charcoal-900 border-l-4 border-l-vermilion-500' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="w-24 shrink-0 font-mono text-xs text-offwhite-muted mt-1">
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="font-mono text-sm text-offwhite">{event.toolName}</div>
                <div className="font-sans text-sm text-offwhite-muted line-clamp-1">{event.reason || 'No reason provided'}</div>
              </div>
              <div className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest flex flex-col items-end gap-1">
                <span className={event.decision === 'BLOCK' ? 'text-vermilion-500' : event.decision === 'ALLOW' ? 'text-[#10b981]' : 'text-[#f59e0b]'}>
                  {event.decision.replace('_', ' ')}
                </span>
                <span className="text-offwhite-muted">R{event.riskScore !== undefined ? event.riskScore : 'N/A'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Detail View */}
      <div className="flex-1 h-full overflow-y-auto bg-charcoal-900">
        {selectedEvent ? (
          <ConsoleEventDetail event={selectedEvent} />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-sm uppercase tracking-widest text-offwhite-muted">
            Select an event to view details
          </div>
        )}
      </div>
    </div>
  );
};
