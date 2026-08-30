import React, { useState } from "react";
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

interface Props {
  onNavigate: (route: string) => void;
}

export const StoryExperience: React.FC<Props> = ({ onNavigate }) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="w-full bg-charcoal-900 text-offwhite selection:bg-vermilion-500 selection:text-charcoal-900">
      {showDemo && <DemoOverlay onClose={() => setShowDemo(false)} />}
      <Scene01Hero onNavigate={onNavigate} onRunDemo={() => setShowDemo(true)} />
      <Scene02Problem />
      <Scene03Injection />
      <Scene04Compromised />
      <Scene05Intercept />
      <Scene06Intent />
      <Scene07Provenance />
      <Scene08Decision />
      <Scene09Outcomes />
      <Scene10RugPull />
    </div>
  );
};
