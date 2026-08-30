import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { StoryExperience } from "./components/story/StoryExperience";
import { LiveConsole } from "./components/console/LiveConsole";
import { AppShell } from "./components/AppShell";
import { ConfigureScreen } from "./components/product/ConfigureScreen";
import { HistoryScreen } from "./components/product/HistoryScreen";
import { SettingsScreen } from "./components/product/SettingsScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StoryExperience />} />
      <Route path="/app" element={<AppShell />}>
        <Route index element={<Navigate to="/app/live" replace />} />
        <Route path="live" element={<LiveConsole />} />
        <Route path="configure" element={<ConfigureScreen />} />
        <Route path="history" element={<HistoryScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
