import type { SentinelEvent } from "../types/event";
import { EventRow } from "./EventRow";

export function EventFeed({
  events,
  selectedId,
  onSelect,
}: {
  events: SentinelEvent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
          Live Tool-Call Feed
        </h2>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-text-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-allow" />
          streaming
        </span>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <p className="max-w-xs text-sm text-text-muted">
            No tool calls yet. Once the agent starts calling MCP tools, every interaction
            Sentinel evaluates will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="flex-1 divide-y divide-line-soft overflow-y-auto">
          {events.map((evt) => (
            <EventRow
              key={evt.id}
              event={evt}
              selected={evt.id === selectedId}
              onSelect={() => onSelect(evt.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
