// This is the shared contract between the frontend (Ann) and the
// Sentinel gateway backend (Dg). Confirm this shape with Dg before
// he starts emitting real WebSocket events — if his field names differ,
// write an adapter in src/hooks/useEvents.ts rather than changing
// these types or any component.

export type RiskDecision = "ALLOW" | "ASK" | "BLOCK";

export type CheckpointId =
  | "fingerprint"
  | "injection"
  | "intent"
  | "provenance"
  | "risk";

export type CheckpointResult = {
  id: CheckpointId;
  label: string;
  passed: boolean;
  detail?: string;
};

export type SentinelEvent = {
  id: string;
  timestamp: string; // ISO string
  toolName: string;
  server: "benign" | "malicious";
  intent: string; // the user's original captured intent
  decision: RiskDecision;
  riskScore: number; // 0-100
  reason: string; // human-readable explanation for the decision
  tainted: boolean; // provenance: did this involve untrusted-source data?
  fingerprintMismatch: boolean; // rug-pull detection
  checkpoints: CheckpointResult[]; // pipeline trace, in order
  attackType?: string; // e.g. "prompt-injection", "tool-poisoning", "rug-pull", "cross-tool"
};

export type GuardStatus = "ON" | "OFF";
