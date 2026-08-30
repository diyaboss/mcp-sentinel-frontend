import type { RiskDecision } from "../types/event";

const STYLES: Record<RiskDecision, { bg: string; text: string; dot: string; label: string }> = {
  ALLOW: { bg: "bg-allow/10", text: "text-allow", dot: "bg-allow", label: "ALLOW" },
  ASK: { bg: "bg-ask/10", text: "text-ask", dot: "bg-ask", label: "ASK USER" },
  BLOCK: { bg: "bg-block/10", text: "text-block", dot: "bg-block", label: "BLOCK" },
};

export function DecisionBadge({ decision }: { decision: RiskDecision }) {
  const s = STYLES[decision];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-current/20 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide ${s.bg} ${s.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${decision === "BLOCK" ? "animate-flash" : ""}`} />
      {s.label}
    </span>
  );
}
