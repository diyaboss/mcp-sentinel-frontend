import React, { useState, useEffect, useRef } from "react";
import { AgentNode, SecurityGate, ToolCallPacket } from "../visuals/TechnicalObjects";

export const Scene05Intercept: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScroll = windowHeight + rect.height;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation states based on scroll
  const interceptPhase = scrollProgress > 0.4;
  const analyzePhase = scrollProgress > 0.6;

  return (
    <section ref={containerRef} className="relative w-full min-h-[200vh] bg-charcoal-900">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        
        <h2 className={`absolute top-24 font-display text-5xl md:text-7xl uppercase tracking-tightest transition-opacity duration-700 ${interceptPhase ? 'opacity-100 text-offwhite' : 'opacity-0'}`}>
          Sentinel <span className="text-vermilion-500">Intercepts.</span>
        </h2>

        <div className="w-full max-w-6xl flex items-center justify-between gap-4 mt-24">
          <AgentNode className="scale-75 md:scale-100 shrink-0" />
          
          <div className="flex-1 relative h-32 mx-4 md:mx-12">
            {/* The wire */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-offwhite/10 -translate-y-1/2" />
            
            {/* Moving Packet */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-10"
              style={{
                left: interceptPhase ? '50%' : '10%',
                transform: `translate(${interceptPhase ? '-150%' : '0'}, -50%)`
              }}
            >
              <ToolCallPacket toolName="read_demo_secret" className={interceptPhase ? '!border-vermilion-500' : ''} />
            </div>

            {/* Sentinel Gate */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${interceptPhase ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} z-20`}>
              <SecurityGate state={interceptPhase ? 'block' : 'idle'} />
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-2 opacity-30">
            <div className="text-xs font-mono tracking-widest uppercase">Target</div>
            <div className="w-16 h-16 border-2 border-dashed border-offwhite-muted flex items-center justify-center font-display text-2xl">
              TOOL
            </div>
          </div>
        </div>

        {/* Evaluation Concepts Teaser */}
        <div className={`absolute bottom-24 w-full px-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 transform ${analyzePhase ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          <div className="border-l-4 border-vermilion-500 pl-6 py-2 bg-charcoal-800/50 backdrop-blur-sm">
            <h3 className="font-display text-3xl tracking-tightest uppercase text-offwhite mb-2">Intent</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-offwhite-muted">What did the user ask?</p>
          </div>
          
          <div className="border-l-4 border-vermilion-500 pl-6 py-2 bg-charcoal-800/50 backdrop-blur-sm">
            <h3 className="font-display text-3xl tracking-tightest uppercase text-offwhite mb-2">Provenance</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-offwhite-muted">Where did this come from?</p>
          </div>
          
          <div className="border-l-4 border-vermilion-500 pl-6 py-2 bg-charcoal-800/50 backdrop-blur-sm">
            <h3 className="font-display text-3xl tracking-tightest uppercase text-offwhite mb-2">Capability</h3>
            <p className="font-sans text-xs uppercase tracking-widest text-offwhite-muted">Is this action privileged?</p>
          </div>

        </div>

      </div>
    </section>
  );
};
