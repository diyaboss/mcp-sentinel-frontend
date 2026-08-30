import React from "react";
import type { SentinelEvent } from "../../types/event";

interface Props {
  events: SentinelEvent[];
  selectedId: string | null | undefined;
  onSelect: (id: string) => void;
}

export const ConsoleEventStream: React.FC<Props> = ({ events, selectedId, onSelect }) => {
  if (events.length === 0) {
    return (
      <div className="p-8 text-center text-offwhite-muted font-sans text-sm uppercase tracking-widest">
        Waiting for activity...
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {events.map((event, idx) => {
        const isSelected = event.id === selectedId;
        const isBlock = event.decision === "BLOCK";
        const isAsk = event.decision === "ASK";
        
        let decisionColor = "text-offwhite";
        if (isBlock) decisionColor = "text-vermilion-500";
        if (isAsk) decisionColor = "text-[#f59e0b]";

        return (
          <button
            key={event.id}
            onClick={() => onSelect(event.id)}
            className={`w-full text-left px-6 py-6 border-b transition-colors duration-300 ${isSelected ? 'bg-charcoal-700 border-l-4 border-l-vermilion-500 border-b-offwhite/10' : 'bg-transparent border-b-offwhite/5 border-l-4 border-l-transparent hover:bg-charcoal-700/50'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-mono text-xs text-offwhite-muted tracking-widest">
                {new Date(event.timestamp).toLocaleTimeString()}
              </div>
              {event.tainted && (
                <div className="bg-vermilion-500/10 text-vermilion-500 border border-vermilion-500/30 px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase">
                  Tainted
                </div>
              )}
            </div>

            <div className={`font-mono text-lg mb-4 truncate ${isBlock ? 'text-vermilion-500/80' : 'text-offwhite-muted'}`}>
              {event.toolName}
            </div>

            <div className={`font-display text-4xl tracking-tightest uppercase ${decisionColor}`}>
              {event.decision}
            </div>

            {event.server === 'malicious' && (
              <div className="mt-4 text-xs font-mono text-vermilion-500 uppercase tracking-widest">
                Source: {event.server}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
