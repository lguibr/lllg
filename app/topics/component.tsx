"use client";
import { useTopics } from "@/app/contexts/topics";
import { Text } from "@/app/components/Text";
import styled from "styled-components";
import FileGrid from "@/app/components/FileGrid";
import { useState } from "react";
import VectorStoreModal from "./modal";
import Button from "@/app/components/Button";

export default function Topic(): JSX.Element {
  const { topics, selectedTopics, handleTopicSelect, handleTopicDelete } =
    useTopics();

  console.log("topics", topics);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ContextsContainer>
      <Text as="h2">Existing Topics</Text>
      <ContextGrid>
        {topics.map((topic, index) =>
          Object.entries(topic).map(([key, contextData], index: number) => (
            <ContextContainer
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleTopicSelect(key);
              }}
              isSelected={selectedTopics.includes(contextData.name)}
            >
              <Text uppercase weight={"bolder"} size="xsmall">
                {contextData.name}
              </Text>
              <Text size="xsmall">{contextData.description}</Text>
              <FileGrid files={contextData.files} />
              <DeleteButton
                onClick={(e) => {
                  console.log("delete topic");
                  e.stopPropagation();
                  e.preventDefault();
                  handleTopicDelete(key);
                }}
              >
                X
              </DeleteButton>
            </ContextContainer>
          ))
        )}
      </ContextGrid>

      <FloatingButtonContainer>
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log(selectedTopics);

            if (!!selectedTopics.length) openModal();
          }}
          disabled={!selectedTopics.length}
        >
          Create Topic Vector Store
        </Button>
      </FloatingButtonContainer>
      <VectorStoreModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </ContextsContainer>
  );
}

const FloatingButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ContextsContainer = styled.div`
  min-height: 500px;
  height: max-content;
  box-sizing: border-box;
  display: grid;
  grid-auto-rows: auto;
  padding: 10%;
`;

const ContextGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  box-sizing: border-box;
`;

interface ContextContainerProps {
  isSelected: boolean;
}

const ContextContainer = styled.div<ContextContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid blue" : "2px solid #aaa"};
  max-width: 100%;
  text-align: center;
  &:hover button {
    opacity: 1;
  }
`;
const SelectedContextOverlay = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ isSelected }) =>
    isSelected ? "rgba(0, 0, 0, 0.5)" : "transparent"};
  transition: background-color 0.3s ease;
`;

const DeleteButton = styled.button`
  z-index: 1;
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
