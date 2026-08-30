import React from "react";
import { Link } from "react-router-dom";

interface Props {
  onRunDemo: () => void;
}

export const Scene01Hero: React.FC<Props> = ({ onRunDemo }) => {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-charcoal-900 flex flex-col justify-center">
      
      {/* Background massive decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
        <h1 className="font-display text-[30vw] leading-none whitespace-nowrap tracking-tighter text-offwhite">
          SENTINEL
        </h1>
      </div>

      <div className="relative z-10 px-4 md:px-12 lg:px-24 flex flex-col items-start gap-8 mt-16">
        <h1 className="font-display text-huge leading-[0.85] tracking-tightest uppercase text-offwhite -ml-2 lg:-ml-4 max-w-7xl mix-blend-difference">
          The model<br />
          <span className="text-vermilion-500">can be wrong.</span><br />
          The action<br />
          doesn't have<br />
          to happen.
        </h1>
        
        <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-offwhite-muted max-w-sm border-l border-vermilion-500 pl-4 py-1">
          Runtime authorization for AI agents.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button 
            onClick={onRunDemo}
            className="bg-vermilion-500 text-charcoal-900 font-display text-2xl uppercase px-8 py-3 hover:bg-vermilion-600 transition-colors tracking-widest"
          >
            Watch an Attack
          </button>
          <Link 
            to="/app/live"
            className="border border-offwhite/20 text-offwhite font-display text-2xl uppercase px-8 py-3 hover:bg-offwhite hover:text-charcoal-900 transition-colors tracking-widest"
          >
            Open Sentinel
          </Link>
        </div>
      </div>
    </section>
  );
};
