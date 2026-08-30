import React, { useState, useEffect, useRef } from "react";

export const Scene08Decision: React.FC = () => {
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

  const showExecution = scrollProgress > 0.6;

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] bg-charcoal-900">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Grid/Targeting graphics */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #eee9df 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 text-center w-full max-w-5xl px-4">
          
          <div className={`transition-all duration-1000 transform ${showExecution ? 'opacity-0 scale-110 -translate-y-24 absolute top-1/2 left-1/2 -translate-x-1/2' : 'opacity-100 scale-100 translate-y-0 relative'}`}>
            <h1 className="font-display text-[20vw] lg:text-[15vw] leading-none tracking-tightest text-vermilion-500 uppercase">
              BLOCK.
            </h1>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-b border-vermilion-500/20 py-8">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-vermilion-500 uppercase tracking-widest">Reason</span>
                <span className="font-sans text-sm text-offwhite uppercase">Intent Mismatch</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-vermilion-500 uppercase tracking-widest">Source</span>
                <span className="font-sans text-sm text-offwhite">malicious-server</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-vermilion-500 uppercase tracking-widest">Risk Score</span>
                <span className="font-display text-4xl text-vermilion-500">92</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-vermilion-500 uppercase tracking-widest">Target</span>
                <span className="font-mono text-sm text-offwhite">read_demo_secret()</span>
              </div>
            </div>
            
            <p className="mt-8 font-sans text-xl md:text-2xl text-offwhite-muted max-w-2xl mx-auto">
              READ_SECRET was not part of the original user's request.
            </p>
          </div>

          {/* Transform into Final Statement */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full transition-all duration-1000 delay-300 transform ${showExecution ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <h2 className="font-display text-huge leading-[0.85] tracking-tightest uppercase text-offwhite">
              The action<br />
              <span className="text-vermilion-500">never</span><br />
              executed.
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
};
