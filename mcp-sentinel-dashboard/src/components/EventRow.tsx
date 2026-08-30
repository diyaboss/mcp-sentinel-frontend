import type { SentinelEvent } from "../types/event";
import { DecisionBadge } from "./DecisionBadge";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diffMs / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

export function EventRow({
  event,
  selected,
  onSelect,
}: {
  event: SentinelEvent;
  selected: boolean;
  onSelect: () => void;
}) {
  const isBlocked = event.decision === "BLOCK";

  return (
    <button
      onClick={onSelect}
      className={`group flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left transition-colors ${
        selected
          ? "border-l-signal bg-signal/[0.06]"
          : isBlocked
          ? "border-l-block/40 hover:bg-raised"
          : "border-l-transparent hover:bg-raised"
      }`}
    >
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${
          event.server === "malicious" ? "bg-block" : "bg-text-faint"
        }`}
        title={event.server === "malicious" ? "malicious server" : "benign server"}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-mono text-sm text-text-primary">{event.toolName}</span>
          {event.fingerprintMismatch && (
            <span className="rounded border border-taint/30 bg-taint/10 px-1.5 py-0.5 font-mono text-[10px] text-taint">
              FINGERPRINT
            </span>
          )}
          {event.tainted && (
            <span className="rounded border border-taint/30 bg-taint/10 px-1.5 py-0.5 font-mono text-[10px] text-taint">
              TAINTED
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-text-muted">{event.intent}</p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <DecisionBadge decision={event.decision} />
        <span className="font-mono text-[10px] text-text-faint">{timeAgo(event.timestamp)}</span>
      </div>
    </button>
  );
}
