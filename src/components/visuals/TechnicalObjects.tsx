import React from "react";

export const McpConnector: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 100 20" className={`w-full h-full overflow-visible ${className}`} preserveAspectRatio="none">
    <path
      d="M 0 10 L 40 10 L 50 0 L 60 20 L 70 10 L 100 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      vectorEffect="non-scaling-stroke"
      className="text-offwhite-muted/30"
    />
  </svg>
);

export const AgentNode: React.FC<{ className?: string, active?: boolean }> = ({ className = "", active }) => (
  <div className={`relative flex items-center justify-center p-6 border-2 transform ${active ? 'border-vermilion-500 text-vermilion-500' : 'border-offwhite-muted text-offwhite'} bg-charcoal-900 shadow-2xl ${className}`}>
    <div className="absolute -top-3 left-4 bg-charcoal-900 px-2 text-xs font-mono tracking-widest uppercase">
      AGENT.NODE
    </div>
    <span className="font-display text-4xl tracking-tightest">AI</span>
  </div>
);

export const ServerNode: React.FC<{ className?: string, title?: string, isMalicious?: boolean }> = ({ className = "", title = "SERVER", isMalicious }) => (
  <div className={`relative flex flex-col p-4 border-l-4 ${isMalicious ? 'border-vermilion-500' : 'border-offwhite-muted'} bg-charcoal-800 ${className}`}>
    <div className={`text-xs font-mono tracking-widest uppercase mb-4 ${isMalicious ? 'text-vermilion-500' : 'text-offwhite-muted'}`}>
      {title}
    </div>
    <div className="flex gap-1 mt-auto">
      <div className={`h-1 flex-1 ${isMalicious ? 'bg-vermilion-500' : 'bg-offwhite/20'}`} />
      <div className={`h-1 w-2 ${isMalicious ? 'bg-vermilion-500' : 'bg-offwhite/20'}`} />
      <div className={`h-1 w-1 ${isMalicious ? 'bg-vermilion-500' : 'bg-offwhite/20'}`} />
    </div>
  </div>
);

export const SecurityGate: React.FC<{ className?: string, state?: 'idle' | 'allow' | 'block' }> = ({ className = "", state = 'idle' }) => {
  const colorClass = state === 'block' ? 'text-vermilion-500 border-vermilion-500' : state === 'allow' ? 'text-offwhite border-offwhite' : 'text-offwhite-muted border-offwhite-muted/30';
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`w-1 h-12 bg-current ${colorClass}`} />
      <div className={`border-2 px-4 py-2 font-display text-2xl tracking-widest uppercase ${colorClass} bg-charcoal-900`}>
        GATEWAY
      </div>
      <div className={`w-1 h-12 bg-current ${colorClass}`} />
    </div>
  );
};

export const ProvenanceTrail: React.FC<{ className?: string, animate?: boolean }> = ({ className = "", animate }) => (
  <svg viewBox="0 0 200 50" className={`w-full overflow-visible ${className}`} preserveAspectRatio="none">
    <path
      d="M 0 25 L 180 25 L 190 15 L 200 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="4 4"
      vectorEffect="non-scaling-stroke"
      className="text-vermilion-500"
    />
    {animate && (
      <circle cx="0" cy="25" r="4" fill="currentColor" className="text-vermilion-500 animate-pulse-slow" />
    )}
  </svg>
);

export const FingerprintStrip: React.FC<{ className?: string, hash?: string, mismatch?: boolean }> = ({ className = "", hash = "1A4B9F", mismatch }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <div className="flex items-end gap-1 h-8">
      {[40, 80, 30, 100, 60, 20, 90, 50].map((h, i) => (
        <div key={i} className={`w-2 ${mismatch ? 'bg-vermilion-500' : 'bg-offwhite'}`} style={{ height: `${h}%` }} />
      ))}
    </div>
    <div className={`font-mono text-xs ${mismatch ? 'text-vermilion-500' : 'text-offwhite-muted'}`}>
      HASH:{hash}
    </div>
  </div>
);

export const TaintMarker: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center justify-center px-2 py-0.5 bg-vermilion-500 text-charcoal-900 font-display text-sm uppercase tracking-widest ${className}`}>
    TAINTED
  </div>
);

export const ToolCallPacket: React.FC<{ className?: string, toolName: string }> = ({ className = "", toolName }) => (
  <div className={`inline-flex items-center gap-2 border border-offwhite-muted/50 bg-charcoal-800 p-2 ${className}`}>
    <div className="w-2 h-2 bg-offwhite animate-pulse-slow" />
    <span className="font-mono text-xs text-offwhite">{toolName}()</span>
  </div>
);
