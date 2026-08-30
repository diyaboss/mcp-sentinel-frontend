import React, { useRef, useState, useEffect } from "react";

export const Scene04Compromised: React.FC = () => {
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

  const statementOpacity = Math.min(1, scrollProgress * 3);
  const codeScale = Math.max(1, 1.2 - (scrollProgress * 0.2));

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-vermilion-500 selection:bg-charcoal-900 selection:text-vermilion-500 overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        <div className="relative z-10 w-full px-8 lg:px-24 flex flex-col items-center justify-center text-center">
          
          <div className="transition-opacity duration-300 w-full flex flex-col items-center" style={{ opacity: statementOpacity }}>
            <h2 className="font-display text-huge leading-[0.8] tracking-tightest uppercase text-charcoal-900 mb-12">
              THE MODEL<br />
              FOLLOWED IT.
            </h2>

            <div className="w-full max-w-[100vw] overflow-hidden flex flex-col items-center" style={{ transform: `scale(${codeScale})` }}>
              <div className="text-xs font-mono tracking-widest text-charcoal-900 mb-2 uppercase opacity-60">
                Action Pending Execution
              </div>
              <div className="font-mono text-4xl md:text-7xl lg:text-[7vw] font-bold text-offwhite drop-shadow-2xl whitespace-nowrap">
                read_demo_secret()
              </div>
              <div className="mt-8 border-t border-charcoal-900/30 pt-4 flex gap-4 text-xs font-mono uppercase tracking-widest text-charcoal-900">
                <span className="opacity-60">Source Taint:</span>
                <span className="font-bold">malicious-research-server</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
