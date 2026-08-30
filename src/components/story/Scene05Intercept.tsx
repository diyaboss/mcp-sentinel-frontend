import React, { useRef, useState, useEffect } from "react";

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

  const actionMove = Math.min(1, Math.max(0, scrollProgress * 4)); // 0 to 0.25
  const sentinelDrop = Math.min(1, Math.max(0, (scrollProgress - 0.15) * 4)); // 0.15 to 0.4
  
  const revealIntent = scrollProgress > 0.3;
  const revealProvenance = scrollProgress > 0.45;
  const revealCapability = scrollProgress > 0.6;

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-charcoal-800 overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        {/* Background Labels */}
        <div className="absolute inset-0 flex justify-between items-center px-12 lg:px-32 opacity-20 pointer-events-none">
          <div className="font-display text-4xl lg:text-7xl uppercase tracking-widest text-offwhite-muted transform -rotate-90 origin-left">
            Agent Action
          </div>
          <div className="font-display text-4xl lg:text-7xl uppercase tracking-widest text-offwhite-muted transform rotate-90 origin-right">
            System Execution
          </div>
        </div>

        {/* The Action moving left to right */}
        <div 
          className="absolute z-10 w-full flex items-center px-8 lg:px-32"
          style={{ transform: `translateX(calc(${actionMove * 40}vw))` }}
        >
          <div className="font-mono text-3xl md:text-5xl lg:text-[4vw] text-offwhite bg-charcoal-900 border border-offwhite/20 px-8 py-4 shadow-xl">
            read_demo_secret()
          </div>
        </div>

        {/* The Giant Sentinel Barrier */}
        <div 
          className="absolute z-20 w-8 md:w-16 lg:w-32 bg-offwhite flex flex-col justify-center items-center shadow-[0_0_100px_rgba(238,233,223,0.3)] transition-transform duration-100 ease-out"
          style={{ 
            height: '150vh',
            transform: `translateY(${(1 - sentinelDrop) * -150}%) rotate(5deg)`
          }}
        >
          <div className="font-display text-[8rem] lg:text-[15rem] text-charcoal-900 uppercase tracking-tightest leading-none transform -rotate-90">
            SENTINEL
          </div>
        </div>

        {/* The Evaluations */}
        <div className="absolute z-30 flex flex-col gap-4 lg:gap-8 items-center" style={{ opacity: sentinelDrop }}>
          <div className={`transition-all duration-700 transform ${revealIntent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
            <h3 className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tightest text-offwhite mix-blend-difference">
              INTENT
            </h3>
          </div>
          <div className={`transition-all duration-700 transform ${revealProvenance ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
            <h3 className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tightest text-vermilion-500 mix-blend-difference">
              PROVENANCE
            </h3>
          </div>
          <div className={`transition-all duration-700 transform ${revealCapability ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
            <h3 className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tightest text-offwhite mix-blend-difference">
              CAPABILITY
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};
