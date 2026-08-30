# MCP Sentinel — Security Dashboard (Ann's piece)

A live monitoring dashboard for MCP Sentinel: shows every tool call passing
through the gateway, the checkpoint it was caught at (if any), and the
final Allow / Ask / Block decision.

Runs entirely on **mock data by default** — no backend required to develop
or demo.

## 1. Install & run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). You should see
events streaming in every ~3 seconds, generated locally.

## 2. Project structure

```
src/
  types/event.ts        <- the shared contract with Dg's backend
  mock/mockEvents.ts     <- seed data + live mock event generator
  hooks/useEvents.ts      <- the ONE place that switches mock <-> real WebSocket
  components/
    DecisionBadge.tsx      Allow/Ask/Block pill
    EventRow.tsx            one row in the feed
    EventFeed.tsx            scrollable list of EventRow
    EventDetailPanel.tsx    full trace when you click an event
    FingerprintAlert.tsx     rug-pull / quarantine banner
    GuardToggle.tsx           ON/OFF breaker switch (demo centerpiece)
    StatsHeader.tsx           allow/ask/block counters
    PipelineSignature.tsx    the gateway "checkpoint" visual at the top
  App.tsx                 <- layout, wires everything together
```

## 3. Working independently of the backend

Everything you build against `SEED_EVENTS` / `generateMockEvent()` in
`src/mock/mockEvents.ts`. Add more seed events there any time you want to
cover a new attack scenario in the feed.

The **Guard toggle** in the header already works fully on mock data: with
Guard ON, simulated malicious-server calls get BLOCKed; with Guard OFF,
they go through as ALLOW. That's your live demo moment — no backend
needed to rehearse it.

## 4. Connecting to Dg's real backend later

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_USE_MOCK=false` and point `VITE_WS_URL` at his WebSocket
   (default assumed: `ws://localhost:8000/ws`).
3. Click the **"MOCK DATA" pill** in the header (top right) to flip to
   **"LIVE GATEWAY"** at runtime — or just reload after changing the env
   file.
4. Confirm with Dg that each WebSocket message matches the `SentinelEvent`
   shape in `src/types/event.ts`. If field names differ, translate them
   inside `adaptBackendMessage()` in `src/hooks/useEvents.ts` — don't
   change the components or the type file.

## 5. Design notes

- Dark "control room" palette, not the generic AI-demo cream/terracotta
  look — deep graphite-blue background, IBM Plex Mono for
  technical/data text, Inter for body copy.
- Decision colors are semantic and consistent everywhere: green = ALLOW,
  amber = ASK, red = BLOCK, violet = provenance/taint/fingerprint flags.
- The top strip (`PipelineSignature`) is the signature visual: it shows
  the most recent call moving through Sentinel's 5 checkpoints and marks
  exactly where it was stopped, if it was.

## 6. Suggested next steps

- [ ] Add a small Recharts sparkline in `StatsHeader` if you want a
      risk-score-over-time trend for the pitch.
- [ ] Add a toast/flash animation when a new BLOCK event streams in.
- [ ] Once Dg's WebSocket is live, do a joint test session with the guard
      toggle to make sure ON/OFF actually reflects the backend's real
      enforcement, not just simulated data.
