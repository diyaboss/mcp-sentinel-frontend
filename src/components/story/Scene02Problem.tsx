import React from "react";
import { useIntersection } from "../../hooks/useIntersection";

export const Scene02Problem: React.FC = () => {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="scene-02" className="relative w-full min-h-screen bg-charcoal-800 py-32 px-4 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden">
      <div ref={ref} className={`transition-all duration-1000 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        
        <h2 className="font-display text-huge leading-[0.85] tracking-tightest uppercase text-offwhite max-w-5xl mb-32">
          The agent<br />
          <span className="text-offwhite-muted">has access.</span><br />
          That doesn't mean<br />
          the action is<br />
          <span className="text-vermilion-500">authorized.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-end">
          
          {/* User intent contrast */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="text-xs font-mono tracking-widest text-vermilion-500 uppercase mb-4">
              USER INTENT
            </div>
            <p className="font-sans text-3xl md:text-5xl leading-tight text-offwhite font-medium border-l-4 border-vermilion-500 pl-8">
              "Summarize project issues."
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Technical capabilities */}
          <div className="lg:col-span-6 flex flex-col gap-2 opacity-30 mix-blend-screen hover:opacity-100 transition-opacity duration-1000">
            <div className="font-display text-[6vw] leading-[0.8] tracking-tightest text-offwhite uppercase">
              READ ISSUE
            </div>
            <div className="font-display text-[6vw] leading-[0.8] tracking-tightest text-offwhite uppercase">
              SEND MESSAGE
            </div>
            <div className="font-display text-[6vw] leading-[0.8] tracking-tightest text-vermilion-500 uppercase">
              READ SECRET
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
