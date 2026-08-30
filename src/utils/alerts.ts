import type { SentinelEvent } from "../types/event";

export type AlertSeverity = "HIGH" | "MEDIUM";

export type SentinelAlert = {
  id: string;
  timestamp: string;
  toolName: string;
  message: string;
  severity: AlertSeverity;
};

/**
 * Derives a flat list of security alerts from the event stream.
 * Anything blocked or fingerprint-mismatched is HIGH severity;
 * anything held for review (ASK) is MEDIUM. Clean ALLOW calls
 * never produce an alert — alerts should only appear when relevant.
 */
export function buildAlerts(events: SentinelEvent[]): SentinelAlert[] {
  const alerts: SentinelAlert[] = [];

  for (const e of events) {
    if (e.decision === "BLOCK") {
      alerts.push({
        id: e.id,
        timestamp: e.timestamp,
        toolName: e.toolName,
        message: e.attackType
          ? `${e.attackType.replace("-", " ")} detected in tool call: ${e.toolName}`
          : `Blocked tool call: ${e.toolName}`,
        severity: "HIGH",
      });
    } else if (e.decision === "ASK") {
      alerts.push({
        id: e.id,
        timestamp: e.timestamp,
        toolName: e.toolName,
        message: `High-risk action requires user confirmation: ${e.toolName}`,
        severity: "MEDIUM",
      });
    } else if (e.fingerprintMismatch) {
      alerts.push({
        id: e.id,
        timestamp: e.timestamp,
        toolName: e.toolName,
        message: `Fingerprint mismatch detected on ${e.toolName}`,
        severity: "HIGH",
      });
    }
  }

  return alerts;
}
