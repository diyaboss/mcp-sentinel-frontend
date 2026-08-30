import type { SentinelEvent } from "../types/event";
import { DecisionBadge } from "./DecisionBadge";

function riskColor(score: number) {
  if (score >= 70) return "text-block";
  if (score >= 35) return "text-ask";
  return "text-allow";
}

export function EventDetailPanel({ event }: { event: SentinelEvent | null }) {
  if (!event) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-line bg-surface px-6 text-center">
        <div className="mb-3 h-10 w-10 rounded-full border border-line-soft" />
        <p className="text-sm text-text-muted">Select a call from the feed to inspect its trace.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-lg border border-line bg-surface">
      <div className="border-b border-line px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-mono text-base font-semibold text-text-primary">{event.toolName}</h2>
            <p className="mt-0.5 text-xs text-text-faint">
              {event.server === "malicious" ? "malicious server" : "benign server"} · {event.id}
            </p>
          </div>
          <DecisionBadge decision={event.decision} />
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className={`font-mono text-3xl font-semibold ${riskColor(event.riskScore)}`}>
            {event.riskScore}
          </span>
          <span className="text-xs text-text-faint">/ 100 risk score</span>
        </div>
      </div>

      <div className="space-y-5 px-5 py-4">
        <section>
          <h3 className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Captured Intent
          </h3>
          <p className="rounded-md border border-line-soft bg-ink/60 px-3 py-2 text-sm text-text-primary">
            {event.intent}
          </p>
        </section>

        <section>
          <h3 className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Decision Reason
          </h3>
          <p className="text-sm leading-relaxed text-text-muted">{event.reason}</p>
        </section>

        <section>
          <h3 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Checkpoint Trace
          </h3>
          <ol className="space-y-1.5">
            {event.checkpoints.map((cp, i) => (
              <li
                key={cp.id}
                className={`flex items-start gap-2.5 rounded-md border px-3 py-2 text-xs ${
                  cp.passed ? "border-line-soft bg-ink/40" : "border-block/30 bg-block/[0.06]"
                }`}
              >
                <span className="mt-0.5 font-mono text-text-faint">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cp.passed ? "text-text-primary" : "text-block"}>{cp.label}</span>
                    <span className={`font-mono text-[10px] ${cp.passed ? "text-allow" : "text-block"}`}>
                      {cp.passed ? "PASS" : "FLAGGED"}
                    </span>
                  </div>
                  {cp.detail && <p className="mt-0.5 text-text-muted">{cp.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-wrap gap-2">
          {event.tainted && (
            <span className="rounded-md border border-taint/30 bg-taint/10 px-2.5 py-1 font-mono text-[11px] text-taint">
              Provenance: TAINTED
            </span>
          )}
          {event.fingerprintMismatch && (
            <span className="rounded-md border border-taint/30 bg-taint/10 px-2.5 py-1 font-mono text-[11px] text-taint">
              Fingerprint mismatch
            </span>
          )}
          {event.attackType && (
            <span className="rounded-md border border-block/30 bg-block/10 px-2.5 py-1 font-mono text-[11px] text-block">
              {event.attackType}
            </span>
          )}
        </section>
      </div>
    </div>
  );
}
