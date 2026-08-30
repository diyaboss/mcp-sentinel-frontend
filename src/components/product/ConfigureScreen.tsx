import React, { useState } from "react";
import { defaultSentinelConfig, SentinelConfig } from "../../config/state";

export const ConfigureScreen: React.FC = () => {
  const [config, setConfig] = useState<SentinelConfig>(defaultSentinelConfig);

  const toggle = (key: keyof SentinelConfig) => {
    setConfig(c => ({ ...c, [key]: !c[key] }));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-charcoal-800 p-8 lg:p-12">
      <div className="max-w-4xl">
        
        <h1 className="font-display text-4xl uppercase tracking-widest text-offwhite mb-2">Configuration</h1>
        <p className="font-mono text-xs uppercase tracking-widest text-offwhite-muted mb-12">Local Demo State / Not Persisted to Backend</p>

        {/* 1. MCP SERVERS */}
        <section className="mb-16">
          <h2 className="font-display text-2xl uppercase tracking-widest text-vermilion-500 mb-6 border-b border-vermilion-500/30 pb-2">1. MCP Servers</h2>
          <div className="bg-charcoal-900 border border-offwhite/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="font-mono text-lg text-offwhite">malicious-research-server</div>
              <div className="font-mono text-xs text-offwhite-muted mt-1 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#10b981]"></span> Connected
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-offwhite/20 text-offwhite-muted hover:text-offwhite font-mono text-xs uppercase tracking-widest transition-colors">Disable</button>
              <button className="px-4 py-2 bg-vermilion-500 text-charcoal-900 font-mono text-xs font-bold uppercase tracking-widest hover:bg-vermilion-600 transition-colors">Quarantine</button>
            </div>
          </div>
        </section>

        {/* 2. SECURITY MODULES */}
        <section className="mb-16">
          <h2 className="font-display text-2xl uppercase tracking-widest text-vermilion-500 mb-6 border-b border-vermilion-500/30 pb-2">2. Security Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['intentEnforcement', 'provenanceTracking', 'fingerprinting', 'injectionDetection', 'taintTracking'] as const).map(module => (
              <div key={module} className="bg-charcoal-900 border border-offwhite/10 p-4 flex justify-between items-center cursor-pointer hover:border-offwhite/30 transition-colors" onClick={() => toggle(module)}>
                <div className="font-mono text-sm text-offwhite uppercase tracking-widest">{module.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className={`font-mono text-xs font-bold px-2 py-1 uppercase tracking-widest ${config[module] ? 'bg-vermilion-500 text-charcoal-900' : 'bg-charcoal-800 text-offwhite-muted'}`}>
                  {config[module] ? 'ON' : 'OFF'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. RISK POLICY */}
        <section className="mb-16">
          <h2 className="font-display text-2xl uppercase tracking-widest text-vermilion-500 mb-6 border-b border-vermilion-500/30 pb-2">3. Risk Policy</h2>
          <p className="font-mono text-xs text-offwhite-muted uppercase tracking-widest mb-6">0 = Low Risk | 100 = Highest Risk</p>
          
          <div className="flex flex-col gap-8">
            <div className="bg-charcoal-900 border border-offwhite/10 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="font-mono text-sm text-offwhite uppercase tracking-widest">ASK THRESHOLD</div>
                <div className="font-display text-2xl text-offwhite">{config.askThreshold}</div>
              </div>
              <input type="range" min="0" max="100" value={config.askThreshold} onChange={(e) => setConfig({...config, askThreshold: parseInt(e.target.value)})} className="w-full accent-vermilion-500" />
            </div>

            <div className="bg-charcoal-900 border border-vermilion-500/50 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="font-mono text-sm text-vermilion-500 uppercase tracking-widest">BLOCK THRESHOLD</div>
                <div className="font-display text-2xl text-vermilion-500">{config.blockThreshold}</div>
              </div>
              <input type="range" min="0" max="100" value={config.blockThreshold} onChange={(e) => setConfig({...config, blockThreshold: parseInt(e.target.value)})} className="w-full accent-vermilion-500" />
            </div>
          </div>
        </section>

        {/* 4. ACTIVE AGENT & 5. DATA SOURCE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="font-display text-2xl uppercase tracking-widest text-vermilion-500 mb-6 border-b border-vermilion-500/30 pb-2">4. Active Agent</h2>
            <div className="bg-charcoal-900 border border-offwhite/10 p-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
              <div>
                <span className="text-offwhite-muted">Agent:</span> <span className="text-offwhite">demo-agent</span>
              </div>
              <div>
                <span className="text-offwhite-muted">Session:</span> <span className="text-offwhite">session-8a9b2c</span>
              </div>
              <div>
                <span className="text-offwhite-muted">Intent:</span> <span className="text-offwhite">"Summarize project issues."</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl uppercase tracking-widest text-vermilion-500 mb-6 border-b border-vermilion-500/30 pb-2">5. Data Source</h2>
            <div className="bg-charcoal-900 border border-offwhite/10 p-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#f59e0b]"></div> <span className="text-offwhite font-bold">MOCK DATA MODE</span>
              </div>
              <p className="text-offwhite-muted mt-2 normal-case leading-relaxed">
                Backend WebSocket disconnected. UI is running entirely on local simulated data.
              </p>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};
