"use client";

import { TopicsProvider } from "@/app/contexts/topics";
import React from "react";
import Topic from "./component";

function App() {
  return (
    <main>
      <TopicsProvider>
        <Topic />
      </TopicsProvider>
    </main>
  );
}

export default App;
