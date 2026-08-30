import type { SentinelEvent } from "../types/event";

export function PipelineSignature({ event }: { event: SentinelEvent | null }) {
  const checkpoints = event?.checkpoints ?? [
    { id: "fingerprint", label: "Fingerprint", passed: true },
    { id: "injection", label: "Injection", passed: true },
    { id: "intent", label: "Intent", passed: true },
    { id: "provenance", label: "Provenance", passed: true },
    { id: "risk", label: "Risk Engine", passed: true },
  ];

  // index of the first failed checkpoint, if any — this is where the
  // traveling call visually stops.
  const stopIndex = checkpoints.findIndex((c) => !c.passed);
  const stopped = stopIndex !== -1;

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Zero-Trust Gateway
          </p>
          <p className="mt-0.5 text-sm text-text-primary">
            {event ? (
              <>
                <span className="font-mono text-text-muted">{event.toolName}</span> passing through
                Sentinel
              </>
            ) : (
              "Awaiting tool calls…"
            )}
          </p>
        </div>
        {event && (
          <span
            className={`font-mono text-xs font-semibold ${
              stopped ? "text-block" : "text-allow"
            }`}
          >
            {stopped ? `INTERCEPTED AT ${checkpoints[stopIndex].label.toUpperCase()}` : "CLEARED"}
          </span>
        )}
      </div>

      <div className="relative flex items-center" key={event?.id ?? "idle"}>
        {/* connecting track */}
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line-soft" />
        <div
          className={`absolute left-0 top-1/2 h-px -translate-y-1/2 transition-all duration-700 ease-out ${
            stopped ? "bg-block" : "bg-signal"
          }`}
          style={{
            width: stopped
              ? `${(stopIndex / (checkpoints.length - 1)) * 100}%`
              : "100%",
          }}
        />

        {checkpoints.map((cp, i) => {
          const isFail = !cp.passed;
          const isReached = event ? (stopped ? i <= stopIndex : true) : false;
          return (
            <div
              key={cp.id}
              className="relative z-10 flex flex-1 flex-col items-center gap-2"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[10px] font-semibold transition-colors duration-500 ${
                  !event
                    ? "border-line-soft bg-surface text-text-faint"
                    : isFail
                    ? "border-block bg-block/20 text-block"
                    : isReached
                    ? "border-signal bg-signal/20 text-signal"
                    : "border-line-soft bg-surface text-text-faint"
                }`}
              >
                {isFail ? "×" : i + 1}
              </div>
              <span
                className={`text-center font-mono text-[10px] leading-tight ${
                  isFail ? "text-block" : "text-text-muted"
                }`}
              >
                {cp.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
