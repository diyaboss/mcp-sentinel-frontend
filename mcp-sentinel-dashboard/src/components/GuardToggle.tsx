import type { GuardStatus } from "../types/event";

export function GuardToggle({ status, onToggle }: { status: GuardStatus; onToggle: () => void }) {
  const isOn = status === "ON";

  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-3 rounded-lg border px-3.5 py-2 transition-colors ${
        isOn ? "border-allow/30 bg-allow/[0.06]" : "border-block/30 bg-block/[0.06]"
      }`}
      aria-pressed={isOn}
      title="Toggle Sentinel guard on/off"
    >
      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Guard</span>

      <span
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          isOn ? "bg-allow/30" : "bg-block/30"
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full transition-transform ${
            isOn ? "translate-x-4 bg-allow" : "translate-x-1 bg-block"
          }`}
        />
      </span>

      <span className={`font-mono text-xs font-semibold ${isOn ? "text-allow" : "text-block"}`}>
        {status}
      </span>
    </button>
  );
}
