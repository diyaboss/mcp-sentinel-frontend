import React from "react";
import { useIntersection } from "../../hooks/useIntersection";

export const Scene02Problem: React.FC = () => {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="scene-02" className="relative w-full min-h-screen bg-charcoal-800 py-32 px-4 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden">
      <div ref={ref} className={`transition-all duration-1000 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        
        <h2 className="font-display text-huge leading-[0.85] tracking-tightest uppercase text-offwhite max-w-5xl mb-24">
          The agent<br />
          <span className="text-offwhite-muted">has access.</span><br />
          That doesn't mean<br />
          the action is<br />
          <span className="text-vermilion-500">authorized.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Technical capabilities */}
          <div className="flex flex-col gap-6 border-l-2 border-offwhite/10 pl-8">
            <div className="text-xs font-mono tracking-widest text-offwhite-muted mb-4 uppercase">
              System Permissions
            </div>
            <div className="font-display text-5xl md:text-6xl tracking-tightest text-offwhite/40 hover:text-offwhite transition-colors duration-500 cursor-default">
              READ ISSUE
            </div>
            <div className="font-display text-5xl md:text-6xl tracking-tightest text-offwhite/40 hover:text-offwhite transition-colors duration-500 cursor-default">
              SEND MESSAGE
            </div>
            <div className="font-display text-5xl md:text-6xl tracking-tightest text-vermilion-500/50 hover:text-vermilion-500 transition-colors duration-500 cursor-default">
              READ SECRET
            </div>
          </div>

          {/* User intent contrast */}
          <div className="bg-charcoal-900 p-8 md:p-12 border border-vermilion-500/30 relative">
            <div className="absolute -top-3 left-8 bg-charcoal-800 px-4 text-xs font-mono tracking-widest text-vermilion-500 uppercase">
              Actual User Intent
            </div>
            <p className="font-sans text-xl md:text-3xl leading-relaxed text-offwhite font-medium">
              "Summarize project issues."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
