import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import { StoryExperience } from "./components/story/StoryExperience";
import { EditorialNav } from "./components/visuals/EditorialNav";
import { LiveConsole } from "./components/console/LiveConsole";

export default function App() {
  const [route, setRoute] = useState<"story" | "console">("story");
  const { events, guard, toggleGuard, connected, source, toggleSource } = useEvents();

  if (route === "story") {
    return (
      <>
        <EditorialNav onNavigate={(r) => { if(r === 'live') setRoute('console') }} />
        <StoryExperience onNavigate={(r) => { if(r === 'live') setRoute('console') }} />
      </>
    );
  }

  return (
    <div className="w-full h-screen bg-charcoal-900 flex flex-col overflow-hidden text-offwhite selection:bg-vermilion-500 selection:text-charcoal-900">
      <EditorialNav onNavigate={(r) => { if(r === 'story' || r === 'how-it-works') setRoute('story') }} isConsole />
      
      <div className="flex-1 mt-[80px] overflow-hidden">
        <LiveConsole 
          events={events}
          connected={connected}
          source={source}
          onToggleSource={toggleSource}
          guard={guard}
          onToggleGuard={toggleGuard}
        />
      </div>
    </div>
  );
}
