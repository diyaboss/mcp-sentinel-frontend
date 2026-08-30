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
  
  const intentState = scrollProgress < 0.3 ? 'hidden' : scrollProgress < 0.45 ? 'active' : 'faded';
  const provState = scrollProgress < 0.45 ? 'hidden' : scrollProgress < 0.6 ? 'active' : 'faded';
  const capState = scrollProgress < 0.6 ? 'hidden' : 'active';

  const getStyle = (state: string) => ({
    opacity: state === 'hidden' ? 0 : state === 'active' ? 1 : 0.15,
    transform: `scale(${state === 'hidden' ? 0.9 : state === 'active' ? 1 : 0.95}) translateY(${state === 'hidden' ? '2rem' : '0'})`,
    transition: 'all 0.5s ease-out'
  });

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] bg-charcoal-800 overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        {/* Background Labels - z-0 */}
        <div className="absolute inset-0 flex justify-between items-center px-12 lg:px-32 opacity-10 pointer-events-none z-0">
          <div className="font-display text-4xl lg:text-7xl uppercase tracking-widest text-offwhite transform -rotate-90 origin-left">
            Agent Action
          </div>
          <div className="font-display text-4xl lg:text-7xl uppercase tracking-widest text-offwhite transform rotate-90 origin-right">
            System Execution
          </div>
        </div>

        {/* The Giant Sentinel Barrier - z-10 (Background Typography Object) */}
        {/* Option B: off-white at ~10-15% opacity */}
        <div 
          className="absolute z-10 w-8 md:w-16 lg:w-32 flex flex-col justify-center items-center transition-transform duration-100 ease-out pointer-events-none"
          style={{ 
            height: '150vh',
            transform: `translateY(${(1 - sentinelDrop) * -150}%) rotate(5deg)`
          }}
        >
          <div className="font-display text-[8rem] lg:text-[15rem] text-offwhite opacity-15 uppercase tracking-tightest leading-none transform -rotate-90">
            SENTINEL
          </div>
        </div>

        {/* The Action moving left to right - z-20 (Technical Object) */}
        <div 
          className="absolute z-20 w-full flex items-center px-8 lg:px-32"
          style={{ transform: `translateX(calc(${actionMove * 40}vw))` }}
        >
          <div className="font-mono text-3xl md:text-5xl lg:text-[4vw] text-offwhite bg-charcoal-900 border border-offwhite/20 px-8 py-4 shadow-2xl">
            read_demo_secret()
          </div>
        </div>

        {/* The Evaluations - z-30 (Foreground Headlines) */}
        <div className="absolute z-30 flex flex-col gap-4 lg:gap-8 items-center pointer-events-none">
          <div style={getStyle(intentState)}>
            <h3 className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tightest text-offwhite">
              INTENT
            </h3>
          </div>
          <div style={getStyle(provState)}>
            <h3 className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tightest text-vermilion-500">
              PROVENANCE
            </h3>
          </div>
          <div style={getStyle(capState)}>
            <h3 className="font-display text-5xl md:text-7xl lg:text-[8vw] uppercase tracking-tightest text-offwhite">
              CAPABILITY
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};
