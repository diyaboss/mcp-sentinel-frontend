import type { SentinelEvent } from "../types/event";

export function FingerprintAlert({ events }: { events: SentinelEvent[] }) {
  const latest = events.find((e) => e.fingerprintMismatch);
  if (!latest) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg border border-taint/30 bg-taint/[0.08] px-4 py-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-taint/40 font-mono text-xs text-taint">
        !
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-taint">
          Quarantine — fingerprint mismatch
        </p>
        <p className="mt-0.5 text-sm text-text-muted">
          <span className="text-text-primary">{latest.toolName}</span> no longer matches its
          registered baseline definition. Treating as untrusted until re-verified.
        </p>
      </div>
    </div>
  );
}
