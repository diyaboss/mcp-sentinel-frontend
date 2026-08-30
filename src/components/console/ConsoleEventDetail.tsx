import React, { useState } from "react";
import type { SentinelEvent } from "../../types/event";

interface Props {
  event: SentinelEvent;
}

export const ConsoleEventDetail: React.FC<Props> = ({ event }) => {
  const [showRaw, setShowRaw] = useState(false);

  const isBlock = event.decision === "BLOCK" || event.decision === "QUARANTINE";
  const isAsk = event.decision === "ASK" || event.decision === "ASK_USER";
  
  let decisionClass = "bg-offwhite text-charcoal-900";
  if (isBlock) decisionClass = "bg-vermilion-500 text-charcoal-900";
  if (isAsk) decisionClass = "bg-[#f59e0b] text-charcoal-900";

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto flex flex-col gap-12">
      
      {/* 1. DECISION */}
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted mb-2">Final Decision</div>
        <div className={`inline-block font-display text-[8rem] leading-[0.8] tracking-tightest px-4 uppercase ${decisionClass}`}>
          {event.decision.replace("_", " ")}
        </div>
      </div>

      {/* 2. ACTION / TOOL */}
      <div className="border-l-4 border-offwhite/20 pl-6">
        <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted mb-2">Agent Action Attempted</div>
        <div className="font-mono text-3xl text-offwhite break-all">
          {event.toolAction || `${event.toolName}()`}
        </div>
        <div className="mt-2 font-sans text-sm text-offwhite-muted">
          via server: <span className={event.server === 'malicious' ? 'text-vermilion-500' : 'text-offwhite'}>{event.server || "UNKNOWN"}</span>
        </div>
      </div>

      {/* 3. WHY / REASON */}
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted mb-4">Reasoning</div>
        <p className="font-sans text-2xl md:text-3xl text-offwhite font-medium leading-relaxed">
          {event.reason || "NOT AVAILABLE"}
        </p>
      </div>

      {/* 4. RISK, INTENT, ATTACK TYPE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-offwhite/10 py-8">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-offwhite-muted">Risk Score</span>
          <span className={`font-display text-5xl tracking-tightest ${event.riskScore && event.riskScore > 75 ? 'text-vermilion-500' : 'text-offwhite'}`}>
            {event.riskScore !== undefined ? event.riskScore : "N/A"}
          </span>
        </div>
        
        <div className="flex flex-col gap-2 col-span-3">
          <span className="font-mono text-xs uppercase tracking-widest text-offwhite-muted">Original User Intent</span>
          <span className="font-sans text-xl text-offwhite border-l-2 border-offwhite/20 pl-4">
            "{event.intent || "UNKNOWN"}"
          </span>
        </div>
      </div>

      {/* 5. PROVENANCE CHAIN */}
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted mb-6">Execution Provenance</div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-24 font-mono text-xs text-offwhite-muted text-right">01</div>
            <div className="flex-1 bg-charcoal-800 p-4 font-mono text-sm border border-offwhite/10">USER REQUEST</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 font-mono text-xs text-offwhite-muted text-right">02</div>
            <div className={`flex-1 p-4 font-mono text-sm border ${event.tainted ? 'bg-vermilion-500/10 border-vermilion-500 text-vermilion-500' : 'bg-charcoal-800 border-offwhite/10'}`}>
              {event.tainted ? `POISONED RESPONSE (${event.server || "UNKNOWN"})` : `STANDARD RESPONSE (${event.server || "UNKNOWN"})`}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 font-mono text-xs text-offwhite-muted text-right">03</div>
            <div className="flex-1 bg-charcoal-800 p-4 font-mono text-sm border border-offwhite/10">AGENT MODEL</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 font-mono text-xs text-offwhite-muted text-right">04</div>
            <div className={`flex-1 p-4 font-mono text-sm font-bold border ${isBlock ? 'bg-vermilion-500 text-charcoal-900 border-vermilion-500' : 'bg-offwhite text-charcoal-900 border-offwhite'}`}>
              {event.toolName}
            </div>
          </div>
        </div>
      </div>

      {/* 6. RAW EVENT TOGGLE */}
      <div className="pt-8 border-t border-offwhite/10">
        <button 
          onClick={() => setShowRaw(!showRaw)}
          className="text-xs font-mono uppercase tracking-widest text-offwhite-muted hover:text-offwhite transition-colors"
        >
          {showRaw ? '- Hide Raw Event' : '+ View Raw Event'}
        </button>
        
        {showRaw && (
          <pre className="mt-4 p-4 bg-charcoal-800 font-mono text-xs text-offwhite-muted overflow-x-auto border border-offwhite/10">
            {JSON.stringify(event, null, 2)}
          </pre>
        )}
      </div>

    </div>
  );
};
