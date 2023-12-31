"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { listVectorStores, deleteVectorStore } from "@/app/lib/lllg";

interface VectorStoresProviderProps {
  children: React.ReactNode;
}

interface VectorStore {
  name: string;
  description: string;
  contexts: string[];
}
type RawVectorStore = { [name: string]: VectorStore };

interface VectorStoresContextValue {
  vectorStores: VectorStore[];
  selectedVectorStores: string[];
  handleVectorStoreSelect: (vectorStore: string) => void;
  handleVectorStoreDelete: (vectorStoreName: string) => void;
}

const VectorStoresContext = createContext<VectorStoresContextValue | undefined>(
  undefined
);

export const VectorStoresProvider: React.FC<VectorStoresProviderProps> = ({
  children,
}) => {
  const [vectorStores, setVectorStores] = useState<VectorStore[]>([]);
  const [selectedVectorStores, setSelectedVectorStores] = useState<string[]>(
    []
  );

  const [token, setToken] = useState("");

  useEffect(() => {
    fetchVectorStores();
  }, []);

  const fetchVectorStores = async () => {
    const result = await listVectorStores(token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      // Transform the result to an array of VectorStore
      const transformRawVectorStores = (
        rawVectorStores: RawVectorStore[]
      ): VectorStore[] => {
        let transformedVectorStores: VectorStore[] = [];

        rawVectorStores.forEach((rawStore) => {
          Object.entries(rawStore).forEach(([name, data]) => {
            transformedVectorStores.push({
              name: name,
              description: data.description,
              contexts: data.contexts,
            });
          });
        });

        return transformedVectorStores;
      };
      setVectorStores(transformRawVectorStores(result));
    }
  };

  const handleVectorStoreSelect = (vectorStore: string) => {
    if (selectedVectorStores.includes(vectorStore)) {
      setSelectedVectorStores(
        selectedVectorStores.filter((v) => v !== vectorStore)
      );
    } else {
      setSelectedVectorStores([...selectedVectorStores, vectorStore]);
    }
  };

  const handleVectorStoreDelete = async (vectorStoreName: string) => {
    const result = await deleteVectorStore(vectorStoreName, token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      fetchVectorStores();
    }
  };

  return (
    <VectorStoresContext.Provider
      value={{
        vectorStores,
        selectedVectorStores,
        handleVectorStoreSelect,
        handleVectorStoreDelete,
      }}
    >
      {children}
    </VectorStoresContext.Provider>
  );
};

export function useVectorStores(): VectorStoresContextValue {
  const context = useContext(VectorStoresContext);
  if (!context) {
    throw new Error(
      `useVectorStores must be used within a VectorStoresProvider`
    );
  }
  return context;
}
