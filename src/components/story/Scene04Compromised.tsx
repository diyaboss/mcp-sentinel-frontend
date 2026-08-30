import React from "react";
import { useIntersection } from "../../hooks/useIntersection";
import { AgentNode, ToolCallPacket } from "../visuals/TechnicalObjects";

export const Scene04Compromised: React.FC = () => {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="relative w-full min-h-screen bg-vermilion-600 flex flex-col justify-center overflow-hidden py-32 px-4 md:px-12">
      {/* Background massive text */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none opacity-20 select-none overflow-hidden">
        <h2 className="font-display text-[25vw] leading-[0.75] whitespace-nowrap tracking-tighter text-charcoal-900 -ml-12">
          COMPROMISED
        </h2>
        <h2 className="font-display text-[25vw] leading-[0.75] whitespace-nowrap tracking-tighter text-charcoal-900 translate-x-[20vw]">
          INFLUENCED
        </h2>
      </div>

      <div ref={ref} className={`relative z-10 max-w-6xl mx-auto w-full transition-all duration-1000 ${isIntersecting ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h2 className="font-display text-huge leading-[0.85] tracking-tightest uppercase text-charcoal-900 mb-24">
          The model<br />
          <span className="text-offwhite">followed</span><br />
          the instruction.
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
          <AgentNode className="scale-125 !bg-charcoal-900 border-charcoal-900 text-offwhite" active={false} />
          
          <div className="flex-1 w-full relative h-32 flex items-center justify-center">
            {/* Animated path */}
            <div className="absolute w-full h-1 bg-charcoal-900/30" />
            
            {/* Packet animation */}
            <div className={`absolute left-0 transition-all duration-1000 ease-out ${isIntersecting ? 'translate-x-[calc(50vw-100px)] md:translate-x-[400px]' : 'translate-x-0'}`}>
              <div className="bg-charcoal-900 border border-offwhite/20 p-4 shadow-2xl">
                <div className="text-xs font-mono text-vermilion-500 tracking-widest uppercase mb-2">Attempted Action</div>
                <div className="font-mono text-xl text-offwhite">read_demo_secret()</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
