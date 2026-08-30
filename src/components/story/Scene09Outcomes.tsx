import React from "react";
import { useIntersection } from "../../hooks/useIntersection";

export const Scene09Outcomes: React.FC = () => {
  const { ref: ref1, isIntersecting: is1 } = useIntersection<HTMLDivElement>({ threshold: 0.5 });
  const { ref: ref2, isIntersecting: is2 } = useIntersection<HTMLDivElement>({ threshold: 0.5 });
  const { ref: ref3, isIntersecting: is3 } = useIntersection<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div className="w-full bg-charcoal-900">
      
      {/* ALLOW */}
      <section ref={ref1} className="w-full min-h-screen flex flex-col justify-center px-12 lg:px-24 border-b border-offwhite/10">
        <div className={`transition-all duration-1000 transform ${is1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="flex gap-4 items-center mb-12">
            <div className="w-4 h-4 bg-offwhite" />
            <h2 className="font-display text-5xl uppercase tracking-widest text-offwhite">ALLOW</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">User Intent</div>
              <div className="text-3xl font-sans text-offwhite">"Read issue #42"</div>
            </div>
            <div className="space-y-4 border-l border-offwhite/20 pl-12">
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">Agent Call</div>
              <div className="text-3xl font-mono text-offwhite-muted">read_issue(42)</div>
            </div>
          </div>
          
          <p className="mt-12 font-sans text-xl uppercase tracking-widest text-offwhite/50">
            Intent Match. Trusted Provenance.
          </p>
        </div>
      </section>

      {/* ASK */}
      <section ref={ref2} className="w-full min-h-screen flex flex-col justify-center px-12 lg:px-24 border-b border-offwhite/10 bg-charcoal-800">
        <div className={`transition-all duration-1000 transform ${is2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="flex gap-4 items-center mb-12">
            <div className="w-4 h-4 bg-[#f59e0b]" />
            <h2 className="font-display text-5xl uppercase tracking-widest text-[#f59e0b]">ASK USER</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">User Intent</div>
              <div className="text-3xl font-sans text-offwhite">"Prepare the report."</div>
            </div>
            <div className="space-y-4 border-l border-offwhite/20 pl-12">
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">Agent Call</div>
              <div className="text-3xl font-mono text-[#f59e0b]">send_message(report)</div>
            </div>
          </div>
          
          <p className="mt-12 font-sans text-xl uppercase tracking-widest text-[#f59e0b]/70 max-w-2xl">
            Sending was not explicitly requested. Sentinel pauses execution and asks the user.
          </p>
        </div>
      </section>

      {/* BLOCK */}
      <section ref={ref3} className="w-full min-h-screen flex flex-col justify-center px-12 lg:px-24">
        <div className={`transition-all duration-1000 transform ${is3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="flex gap-4 items-center mb-12">
            <div className="w-4 h-4 bg-vermilion-500" />
            <h2 className="font-display text-5xl uppercase tracking-widest text-vermilion-500">BLOCK</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-offwhite-muted">User Intent</div>
              <div className="text-3xl font-sans text-offwhite">"Summarize this webpage."</div>
            </div>
            <div className="space-y-4 border-l border-vermilion-500/30 pl-12">
              <div className="text-xs font-mono uppercase tracking-widest text-vermilion-500">Agent Call</div>
              <div className="text-3xl font-mono text-vermilion-500">send_demo_message(secret)</div>
            </div>
          </div>
          
          <p className="mt-12 font-sans text-xl uppercase tracking-widest text-vermilion-500/70 max-w-2xl">
            Malicious page induces dangerous action. Tainted provenance + Intent mismatch. Blocked immediately.
          </p>
        </div>
      </section>

    </div>
  );
};
