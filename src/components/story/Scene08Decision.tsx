import React, { useRef, useState, useEffect } from "react";

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

  const showNeverExecuted = scrollProgress > 0.5;

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-charcoal-900 overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center">
        
        <div className={`transition-all duration-1000 transform absolute w-full flex flex-col items-center justify-center ${showNeverExecuted ? 'scale-150 opacity-0 blur-xl pointer-events-none' : 'scale-100 opacity-100 blur-0'}`}>
          <div className="font-display text-giant tracking-tightest uppercase text-vermilion-500 leading-none">
            BLOCK.
          </div>
          <div className="font-mono text-xl lg:text-3xl tracking-widest text-offwhite-muted uppercase mt-8">
            Risk 92
          </div>
        </div>

        <div className={`transition-all duration-1000 transform absolute w-full flex flex-col items-center justify-center text-center px-4 ${showNeverExecuted ? 'scale-100 opacity-100 blur-0' : 'scale-50 opacity-0 blur-lg pointer-events-none'}`}>
          <div className="font-display text-[12vw] tracking-tightest uppercase text-offwhite leading-[0.8]">
            THE ACTION<br/>
            NEVER<br/>
            EXECUTED.
          </div>
        </div>

      </div>
    </section>
  );
};
