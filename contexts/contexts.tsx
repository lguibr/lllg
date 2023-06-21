"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import {
  listContexts,
  deleteContext,
  CreateVectorStorePayload,
  createVectorStore,
} from "@/lib/lllg";

interface ContextsProviderProps {
  children: React.ReactNode;
}

type ContextType = {
  [key: string]: {
    name: string;
    description: string;
    files: string[];
  };
};

interface ContextsContextValue {
  contexts: ContextType[];
  selectedContexts: string[];
  handleContextSelect: (context: string) => void;
  handleContextDelete: (contextName: string) => void;
  handleCreateVectorStore: (payload: CreateVectorStorePayload) => Promise<void>;
}

const ContextsContext = createContext<ContextsContextValue | undefined>(
  undefined
);

export const ContextsProvider: React.FC<ContextsProviderProps> = ({
  children,
}) => {
  const [contexts, setContexts] = useState<any[]>([]);
  const [selectedContexts, setSelectedContexts] = useState<any[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    fetchContexts();
  }, []);

  const fetchContexts = async () => {
    const result = await listContexts(token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      setContexts(result);
    }
  };

  const handleContextSelect = (context: string) => {
    if (selectedContexts.includes(context)) {
      setSelectedContexts(selectedContexts.filter((c) => c !== context));
    } else {
      setSelectedContexts([...selectedContexts, context]);
    }
  };

  const handleContextDelete = async (contextName: string) => {
    const result = await deleteContext(contextName, token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      fetchContexts();
    }
  };

  const handleCreateVectorStore = async (payload: CreateVectorStorePayload) => {
    const response = await createVectorStore(payload, token);
    if (response instanceof Error)
      console.error("Error while creating vector store");

    alert("Vector store created successfully");
  };

  return (
    <ContextsContext.Provider
      value={{
        contexts,
        selectedContexts,
        handleContextSelect,
        handleContextDelete,
        handleCreateVectorStore,
      }}
    >
      {children}
    </ContextsContext.Provider>
  );
};

export function useContexts(): ContextsContextValue {
  const context = useContext(ContextsContext);
  if (!context) {
    throw new Error(`useContexts must be used within a ContextsProvider`);
  }
  return context;
}
