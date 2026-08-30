import React, { useRef, useState, useEffect } from "react";

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

  const reveal1 = scrollProgress > 0.05;
  const reveal2 = scrollProgress > 0.15;
  const reveal3 = scrollProgress > 0.25;
  const reveal4 = scrollProgress > 0.40;

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-charcoal-900 overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col justify-center px-8 lg:px-32 max-w-7xl mx-auto">
        
        <h2 className="font-display text-4xl text-offwhite-muted uppercase tracking-widest mb-16 opacity-50">
          WHY?
        </h2>

        <div className="flex flex-col">
          {/* USER REQUEST */}
          <div className={`transition-all duration-700 transform ${reveal1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="font-display text-5xl uppercase text-offwhite tracking-tightest">
              USER REQUEST
            </div>
            <div className={`w-1 h-12 lg:h-16 border-l-2 border-dashed my-4 ml-8 transition-colors duration-1000 ${reveal3 ? 'border-vermilion-500' : 'border-offwhite/20'}`}></div>
          </div>

          {/* SEARCH ISSUES */}
          <div className={`transition-all duration-700 transform ${reveal2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="font-display text-6xl lg:text-7xl uppercase text-offwhite tracking-tightest ml-8">
              SEARCH ISSUES
            </div>
            <div className={`w-1 h-12 lg:h-16 border-l-2 border-dashed my-4 ml-16 transition-colors duration-1000 ${reveal3 ? 'border-vermilion-500' : 'border-offwhite/20'}`}></div>
          </div>

          {/* MALICIOUS SERVER */}
          <div className={`transition-all duration-700 transform ${reveal3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="font-display text-7xl lg:text-8xl uppercase text-vermilion-500 tracking-tightest ml-16 leading-[0.85]">
              MALICIOUS<br/>RESEARCH<br/>SERVER
            </div>
            <div className="w-1 h-12 lg:h-16 border-l-2 border-dashed border-vermilion-500 my-4 ml-24"></div>
          </div>

          {/* POISONED RESPONSE */}
          <div className={`transition-all duration-700 transform ${reveal4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="font-display text-[9vw] lg:text-[7vw] uppercase text-vermilion-500 tracking-tightest ml-24 leading-none mix-blend-screen drop-shadow-[0_0_15px_rgba(229,59,18,0.5)]">
              POISONED RESPONSE
            </div>
            <div className="w-1 h-12 lg:h-16 border-l-2 border-dashed border-vermilion-500 my-4 ml-32"></div>
            
            {/* THE FINAL CALL */}
            <div className="font-mono text-3xl lg:text-5xl text-charcoal-900 bg-vermilion-500 inline-block px-4 py-2 mt-4 ml-32 font-bold uppercase shadow-[0_0_30px_rgba(229,59,18,0.8)]">
              read_demo_secret()
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
