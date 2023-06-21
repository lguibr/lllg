"use client";

import { ContextsProvider } from "@/contexts/contexts";
import React from "react";
import Context from "./component";

function App() {
  return (
    <main>
      <ContextsProvider>
        <Context />
      </ContextsProvider>
    </main>
  );
}

export default App;
