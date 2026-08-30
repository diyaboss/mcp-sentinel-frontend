import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import { PipelineSignature } from "./components/PipelineSignature";
import { StatsHeader } from "./components/StatsHeader";
import { GuardToggle } from "./components/GuardToggle";
import { EventFeed } from "./components/EventFeed";
import { EventDetailPanel } from "./components/EventDetailPanel";
import { FingerprintAlert } from "./components/FingerprintAlert";

export default function App() {
  const { events, guard, toggleGuard, connected, source, toggleSource, stats } = useEvents();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvent = events.find((e) => e.id === selectedId) ?? events[0] ?? null;
  const latestEvent = events[0] ?? null;

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-5 px-6 py-6">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-signal/30 bg-signal/10 font-mono text-sm font-bold text-signal shadow-glow">
            S
          </div>
          <div>
            <h1 className="font-mono text-lg font-semibold tracking-tight text-text-primary">
              MCP Sentinel
            </h1>
            <p className="text-xs text-text-faint">Zero-trust runtime gateway for AI agent tool calls</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSource}
            className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-mono text-[11px] text-text-muted transition-colors hover:border-line-soft hover:text-text-primary"
            title="Switch between mock data and the live backend WebSocket"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-allow" : "bg-block"}`} />
            {source === "mock" ? "MOCK DATA" : "LIVE GATEWAY"}
          </button>
          <GuardToggle status={guard} onToggle={toggleGuard} />
        </div>
      </header>

      {/* Signature pipeline visual */}
      <PipelineSignature event={latestEvent} />

      {/* Stats + fingerprint alert */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr]">
        <StatsHeader stats={stats} />
        <FingerprintAlert events={events} />
      </div>

      {/* Feed + detail */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="min-h-[420px]">
          <EventFeed events={events} selectedId={selectedEvent?.id ?? null} onSelect={setSelectedId} />
        </div>
        <div className="min-h-[420px]">
          <EventDetailPanel event={selectedEvent} />
        </div>
      </div>

      <footer className="py-2 text-center font-mono text-[10px] text-text-faint">
        Sentinel evaluates every tool call independently — the agent's judgment is never trusted alone.
      </footer>
    </div>
  );
}
