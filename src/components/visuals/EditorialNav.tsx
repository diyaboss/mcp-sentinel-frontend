import React from "react";

interface NavProps {
  onNavigate?: (route: string) => void;
  isConsole?: boolean;
}

export const EditorialNav: React.FC<NavProps> = ({ onNavigate, isConsole }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-4 lg:p-8 flex items-center justify-between mix-blend-difference pointer-events-none">
      <div className="flex items-center gap-8 pointer-events-auto">
        <div className="text-offwhite font-display text-xl lg:text-2xl font-bold uppercase tracking-tightest cursor-pointer" onClick={() => onNavigate?.("story")}>
          Sentinel
        </div>
        <ul className="hidden lg:flex items-center gap-6 text-xs font-sans tracking-widest uppercase text-offwhite-muted">
          {!isConsole && (
            <li>
              <button onClick={() => onNavigate?.("how-it-works")} className="hover:text-vermilion-500 transition-colors">
                How It Works
              </button>
            </li>
          )}
          <li>
            <button onClick={() => onNavigate?.(isConsole ? "story" : "live")} className="hover:text-vermilion-500 transition-colors">
              {isConsole ? "Return to Story" : "Live"}
            </button>
          </li>
          <li>
            <a href="https://github.com/vibhascode/mcp" target="_blank" rel="noreferrer" className="hover:text-vermilion-500 transition-colors">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      
      <div className="pointer-events-auto flex items-center gap-4">
        {!isConsole && (
          <button 
            onClick={() => onNavigate?.("live")}
            className="text-xs font-sans uppercase tracking-widest border border-offwhite/20 px-4 py-2 hover:bg-offwhite hover:text-charcoal-900 transition-colors"
          >
            Open Console
          </button>
        )}
      </div>
    </nav>
  );
};
