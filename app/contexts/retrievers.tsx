import React, { useState, useEffect, createContext, useContext } from "react";
import {
  listRetrievers,
  deleteRetriever,
  CreateRetrieverPayload,
  createRetriever,
} from "@/app/lib/lllg";

interface RetrieversProviderProps {
  children: React.ReactNode;
}

type RetrieverType = {
  [key: string]: {
    name: string;
    description: string;
  };
};

interface RetrieversContextValue {
  retrievers: RetrieverType[];
  selectedRetrievers: string[];
  handleRetrieverSelect: (retriever: string) => void;
  handleRetrieverDelete: (retrieverName: string) => void;
  handleCreateRetriever: (payload: CreateRetrieverPayload) => Promise<void>;
}

const RetrieversContext = createContext<RetrieversContextValue | undefined>(
  undefined
);

export const RetrieversProvider: React.FC<RetrieversProviderProps> = ({
  children,
}) => {
  const [retrievers, setRetrievers] = useState<any[]>([]);
  const [selectedRetrievers, setSelectedRetrievers] = useState<any[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    fetchRetrievers();
  }, []);

  const fetchRetrievers = async () => {
    const result = await listRetrievers(token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      setRetrievers(result);
    }
  };

  const handleRetrieverSelect = (retriever: string) => {
    if (selectedRetrievers.includes(retriever)) {
      setSelectedRetrievers(selectedRetrievers.filter((r) => r !== retriever));
    } else {
      setSelectedRetrievers([...selectedRetrievers, retriever]);
    }
  };

  const handleRetrieverDelete = async (retrieverName: string) => {
    const result = await deleteRetriever(retrieverName, token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      fetchRetrievers();
    }
  };

  const handleCreateRetriever = async (payload: CreateRetrieverPayload) => {
    const response = await createRetriever(payload, token);
    if (response instanceof Error)
      console.error("Error while creating retriever");

    alert("Retriever created successfully");
  };

  return (
    <RetrieversContext.Provider
      value={{
        retrievers,
        selectedRetrievers,
        handleRetrieverSelect,
        handleRetrieverDelete,
        handleCreateRetriever,
      }}
    >
      {children}
    </RetrieversContext.Provider>
  );
};

export function useRetrievers(): RetrieversContextValue {
  const context = useContext(RetrieversContext);
  if (!context) {
    throw new Error(`useRetrievers must be used within a RetrieversProvider`);
  }
  return context;
}
