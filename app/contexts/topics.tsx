"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import {
  listContexts,
  deleteContext,
  CreateVectorStorePayload,
  createVectorStore,
} from "@/app/lib/lllg";

interface TopicsProviderProps {
  children: React.ReactNode;
}

type TopicType = {
  [key: string]: {
    name: string;
    description: string;
    files: string[];
  };
};

interface TopicsContextValue {
  topics: TopicType[];
  selectedTopics: string[];
  handleTopicSelect: (topicName: string) => void;
  handleTopicDelete: (topicName: string) => void;
  handleCreateVectorStore: (payload: CreateVectorStorePayload) => Promise<void>;
}

const TopicsContext = createContext<TopicsContextValue | undefined>(undefined);

export const TopicsProvider: React.FC<TopicsProviderProps> = ({ children }) => {
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<any[]>([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const result = await listContexts(token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      setTopics(result);
    }
  };

  const handleTopicsSelect = (context: string) => {
    if (selectedTopics.includes(context)) {
      setSelectedTopics(selectedTopics.filter((c) => c !== context));
    } else {
      setSelectedTopics([...selectedTopics, context]);
    }
  };

  const handleTopicDelete = async (contextName: string) => {
    const result = await deleteContext(contextName, token);
    if (result instanceof Error) {
      console.error(result);
    } else {
      fetchTopics();
    }
  };

  const handleCreateVectorStore = async (payload: CreateVectorStorePayload) => {
    const response = await createVectorStore(payload, token);
    if (response instanceof Error)
      console.error("Error while creating vector store");

    alert("Vector store created successfully");
  };

  return (
    <TopicsContext.Provider
      value={{
        topics: topics,
        selectedTopics: selectedTopics,
        handleTopicSelect: handleTopicsSelect,
        handleTopicDelete: handleTopicDelete,
        handleCreateVectorStore,
      }}
    >
      {children}
    </TopicsContext.Provider>
  );
};

export function useTopics(): TopicsContextValue {
  const topics = useContext(TopicsContext);
  if (!topics) {
    throw new Error(`useContexts must be used within a ContextsProvider`);
  }
  return topics;
}
