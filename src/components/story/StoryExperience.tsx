import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EditorialNav } from "../visuals/EditorialNav";
import { Scene01Hero } from "./Scene01Hero";
import { Scene02Problem } from "./Scene02Problem";
import { Scene03Injection } from "./Scene03Injection";
import { Scene04Compromised } from "./Scene04Compromised";
import { Scene05Intercept } from "./Scene05Intercept";
import { Scene06Intent } from "./Scene06Intent";
import { Scene07Provenance } from "./Scene07Provenance";
import { Scene08Decision } from "./Scene08Decision";
import { Scene09Outcomes } from "./Scene09Outcomes";
import { Scene10RugPull } from "./Scene10RugPull";
import { DemoOverlay } from "./DemoOverlay";

export const StoryExperience: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="w-full bg-charcoal-900 text-offwhite selection:bg-vermilion-500 selection:text-charcoal-900">
      <EditorialNav />
      {showDemo && <DemoOverlay onClose={() => setShowDemo(false)} />}
      
      <Scene01Hero onRunDemo={() => setShowDemo(true)} />
      <Scene02Problem />
      <Scene03Injection />
      <Scene04Compromised />
      <Scene05Intercept />
      <Scene06Intent />
      <Scene07Provenance />
      <Scene08Decision />
      <Scene09Outcomes />
      <Scene10RugPull />
      
      {/* Product Transition */}
      <section className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-vermilion-500 text-charcoal-900 px-8 lg:px-24 border-t border-offwhite/10">
        <h2 className="font-display text-huge uppercase tracking-tightest leading-[0.85] text-center mb-8">
          THIS IS<br/>
          THE PRODUCT.
        </h2>
        
        <p className="font-sans text-xl lg:text-2xl font-medium text-center mb-16 opacity-80">
          The story ends here.<br/>
          The runtime starts now.
        </p>

        <Link 
          to="/app/live"
          className="bg-charcoal-900 text-offwhite font-display text-3xl uppercase px-12 py-6 hover:bg-charcoal-800 transition-colors tracking-widest"
        >
          OPEN SENTINEL
        </Link>
      </section>

    </div>
  );
};
