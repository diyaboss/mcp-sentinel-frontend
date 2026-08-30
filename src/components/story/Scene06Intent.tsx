import React from "react";
import { useIntersection } from "../../hooks/useIntersection";

export const Scene06Intent: React.FC = () => {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative w-full min-h-screen bg-charcoal-900 py-32 px-12 lg:px-24 flex flex-col justify-center overflow-hidden">
      <div ref={ref} className={`transition-all duration-1000 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        
        <h2 className="font-display text-huge leading-[0.85] tracking-tightest uppercase text-offwhite mb-24 max-w-5xl">
          What did<br />
          <span className="text-offwhite-muted">the human</span><br />
          actually ask?
        </h2>

        <div className="flex gap-24 items-start">
          <div className="flex-1 bg-charcoal-800 border-l-4 border-vermilion-500 p-12">
            <div className="text-xs font-mono tracking-widest text-vermilion-500 uppercase mb-4">User Intent Context</div>
            <p className="font-sans text-4xl text-offwhite font-medium">"Summarize project issues"</p>
          </div>
          
          <div className="flex-[2] relative min-h-[400px]">
            {/* Allowed Words */}
            <div className={`absolute left-0 top-0 transition-all duration-1000 delay-300 ${isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="text-xs font-mono tracking-widest text-offwhite-muted uppercase mb-4">Implicitly Authorized</div>
              <div className="font-display text-6xl tracking-tightest text-offwhite mb-2">READ</div>
              <div className="font-display text-6xl tracking-tightest text-offwhite">SUMMARIZE</div>
            </div>

            {/* Not Authorized Words */}
            <div className={`absolute right-0 bottom-0 text-right transition-all duration-1000 delay-700 ${isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="text-xs font-mono tracking-widest text-vermilion-500 uppercase mb-4">Not Justified by Intent</div>
              <div className="font-display text-6xl tracking-tightest text-charcoal-700 line-through mb-2">SEND MESSAGE</div>
              <div className="font-display text-6xl tracking-tightest text-charcoal-700 line-through mb-2">DELETE PROJECT</div>
              <div className="font-display text-6xl tracking-tightest text-vermilion-500">READ SECRET</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
