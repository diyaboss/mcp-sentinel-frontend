import { useCallback, useEffect, useRef, useState } from "react";
import type { GuardStatus, SentinelEvent } from "../types/event";
import { SEED_EVENTS, generateMockEvent } from "../mock/mockEvents";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false"; // mock by default
const WS_URL = import.meta.env.VITE_WS_URL ?? "ws://localhost:8000/ws";
const MAX_EVENTS = 200;

/**
 * Adapt a raw message from the real Sentinel gateway into our
 * SentinelEvent shape. If Dg's backend field names differ from
 * src/types/event.ts, translate them here — nowhere else.
 */
function adaptBackendMessage(raw: unknown): SentinelEvent | null {
  try {
    const msg = raw as SentinelEvent;
    if (!msg || !msg.id || !msg.decision) return null;
    return msg;
  } catch {
    return null;
  }
}

export function useEvents() {
  const [events, setEvents] = useState<SentinelEvent[]>(SEED_EVENTS);
  const [guard, setGuard] = useState<GuardStatus>("ON");
  const [connected, setConnected] = useState(false);
  const [source, setSource] = useState<"mock" | "live">(USE_MOCK ? "mock" : "live");
  const wsRef = useRef<WebSocket | null>(null);
  const guardRef = useRef(guard);
  guardRef.current = guard;

  const pushEvent = useCallback((evt: SentinelEvent) => {
    setEvents((prev) => [evt, ...prev].slice(0, MAX_EVENTS));
  }, []);

  // Mock live-feed simulation
  useEffect(() => {
    if (source !== "mock") return;
    setConnected(true);
    const interval = setInterval(() => {
      pushEvent(generateMockEvent(guardRef.current === "ON"));
    }, 3200);
    return () => clearInterval(interval);
  }, [source, pushEvent]);

  // Real WebSocket connection to Dg's gateway
  useEffect(() => {
    if (source !== "live") return;

    let cancelled = false;
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => !cancelled && setConnected(true);
    ws.onclose = () => !cancelled && setConnected(false);
    ws.onerror = () => !cancelled && setConnected(false);
    ws.onmessage = (msg) => {
      try {
        const parsed = JSON.parse(msg.data);
        const adapted = adaptBackendMessage(parsed);
        if (adapted) pushEvent(adapted);
      } catch {
        // ignore malformed frames
      }
    };

    return () => {
      cancelled = true;
      ws.close();
    };
  }, [source, pushEvent]);

  const toggleGuard = useCallback(() => {
    setGuard((g) => (g === "ON" ? "OFF" : "ON"));
  }, []);

  const toggleSource = useCallback(() => {
    setEvents(SEED_EVENTS);
    setSource((s) => (s === "mock" ? "live" : "mock"));
  }, []);

  const stats = {
    total: events.length,
    allow: events.filter((e) => e.decision === "ALLOW").length,
    ask: events.filter((e) => e.decision === "ASK").length,
    block: events.filter((e) => e.decision === "BLOCK").length,
  };

  return { events, guard, toggleGuard, connected, source, toggleSource, stats };
}
