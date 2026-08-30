import React, { useState, useEffect, useRef } from "react";
import { ProvenanceTrail } from "../visuals/TechnicalObjects";

export const Scene07Provenance: React.FC = () => {
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

  const getOpacity = (threshold: number) => scrollProgress > threshold ? 1 : 0.2;

  return (
    <section ref={containerRef} className="relative w-full min-h-[200vh] bg-charcoal-800">
      <div className="sticky top-0 h-screen flex flex-col justify-center px-12 lg:px-24 overflow-hidden">
        
        <h2 className="font-display text-huge leading-[0.85] tracking-tightest uppercase text-offwhite mb-16 max-w-5xl">
          Why is<br />
          <span className="text-offwhite-muted">the agent</span><br />
          doing this?
        </h2>

        <div className="relative w-full max-w-7xl mx-auto h-[400px]">
          {/* Timeline / Chain Background */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-charcoal-700 -translate-y-1/2" />
          
          <div className="flex justify-between items-center h-full relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 transition-opacity duration-500" style={{ opacity: getOpacity(0.2) }}>
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">Origin</div>
              <div className="bg-charcoal-900 border border-offwhite/20 px-6 py-3 font-display text-2xl tracking-widest text-offwhite">
                USER REQUEST
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 transition-opacity duration-500" style={{ opacity: getOpacity(0.3) }}>
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">Tool</div>
              <div className="bg-charcoal-900 border border-offwhite/20 px-6 py-3 font-mono text-xl text-offwhite-muted">
                search_issues
              </div>
            </div>

            {/* Step 3: Malicious Origin */}
            <div className="flex flex-col items-center gap-4 transition-opacity duration-500" style={{ opacity: getOpacity(0.4) }}>
              <div className="text-xs font-mono uppercase tracking-widest text-vermilion-500">Tainted Data</div>
              <div className="bg-vermilion-500 border border-vermilion-500 px-6 py-3 font-display text-2xl tracking-widest text-charcoal-900">
                MALICIOUS SERVER
              </div>
            </div>

            {/* Step 4: Agent generation */}
            <div className="flex flex-col items-center gap-4 transition-opacity duration-500" style={{ opacity: getOpacity(0.5) }}>
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">Generation</div>
              <div className="bg-charcoal-900 border border-offwhite/20 px-6 py-3 font-display text-2xl tracking-widest text-offwhite">
                AGENT MODEL
              </div>
            </div>

            {/* Step 5: Final Attempt */}
            <div className="flex flex-col items-center gap-4 transition-opacity duration-500" style={{ opacity: getOpacity(0.6) }}>
              <div className="text-xs font-mono uppercase tracking-widest text-vermilion-500">Privileged Target</div>
              <div className="bg-charcoal-900 border-2 border-vermilion-500 px-6 py-3 font-mono text-xl text-vermilion-500">
                read_demo_secret()
              </div>
            </div>
          </div>
          
          {/* Animated Trail Overlay */}
          <div className="absolute top-1/2 left-0 w-full h-[50px] -translate-y-1/2 pointer-events-none" style={{ opacity: getOpacity(0.4) }}>
            <ProvenanceTrail animate={scrollProgress > 0.4} />
          </div>
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 transform ${scrollProgress > 0.7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="font-sans text-xl uppercase tracking-widest text-vermilion-500 max-w-2xl mx-auto border border-vermilion-500/30 bg-vermilion-500/10 py-4">
            Sentinel traces the causal chain. The data origin is tainted.
          </p>
        </div>

      </div>
    </section>
  );
};
