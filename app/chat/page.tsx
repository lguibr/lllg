"use client";

import { RetrieversProvider } from "@/app/contexts/retrievers";
import React from "react";
import Chat from "./component";

function App() {
  return (
    <main>
      <RetrieversProvider>
        <Chat />
      </RetrieversProvider>
    </main>
  );
}

export default App;
