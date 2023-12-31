"use client";

import { useVectorStores } from "@/app/contexts/vectorStore";
import { Text } from "@/app/components/Text";
import styled from "styled-components";
import FileGrid from "@/app/components/FileGrid";
import { useState } from "react";
import VectorStoreQueryModal from "./QAModal";
import Button from "@/app/components/Button";
import ChatModal from "./ChatModal";

export default function VectorStores(): JSX.Element {
  const {
    vectorStores,
    selectedVectorStores,
    handleVectorStoreSelect,
    handleVectorStoreDelete,
  } = useVectorStores();

  const [isQAModalOpen, setIsQAModalOpen] = useState(false);
  const openQAModal = () => setIsQAModalOpen(true);
  const closeQAModal = () => setIsQAModalOpen(false);

  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);
  const openModalCreateChatModal = () => setIsCreateChatModalOpen(true);
  const closeModalCreateChatModal = () => setIsCreateChatModalOpen(false);
  console.log({ vectorStores });

  return (
    <VectorStoresContainer>
      <Text as="h2">Existing Vector Stores</Text>
      <VectorStoreGrid>
        {vectorStores.map((vectorStoreData, index) => (
          <VectorStoreContainer
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleVectorStoreSelect(vectorStoreData.name);
            }}
            isSelected={selectedVectorStores.includes(vectorStoreData.name)}
          >
            <Text uppercase weight={"bolder"} size="xsmall">
              {vectorStoreData.name}
            </Text>
            <Text size="xsmall">{vectorStoreData.description}</Text>
            <FileGrid files={vectorStoreData.contexts ?? []} />
            <DeleteButton
              onClick={(e) => {
                console.log("delete vectorStore");
                e.stopPropagation();
                e.preventDefault();
                handleVectorStoreDelete(vectorStoreData.name);
              }}
            >
              X
            </DeleteButton>
          </VectorStoreContainer>
        ))}
      </VectorStoreGrid>

      <FloatingButtonContainer>
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log(selectedVectorStores);

            if (!!selectedVectorStores.length) openQAModal();
          }}
          disabled={!selectedVectorStores.length}
        >
          Make a question for a context
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log(selectedVectorStores);

            if (!!selectedVectorStores.length) openModalCreateChatModal();
          }}
          disabled={!selectedVectorStores.length}
        >
          Create a new chat from selected vector stores
        </Button>
      </FloatingButtonContainer>
      <ChatModal
        isOpen={isCreateChatModalOpen}
        onRequestClose={closeModalCreateChatModal}
      />
      <VectorStoreQueryModal
        vectorStoreName={selectedVectorStores[0]}
        isOpen={isQAModalOpen}
        onRequestClose={closeQAModal}
      />
    </VectorStoresContainer>
  );
}

const VectorStoresContainer = styled.div`
  position: relative;
  min-height: 500px;
  height: max-content;
  box-sizing: border-box;
  display: grid;
  grid-auto-rows: auto;
  padding: 10%;
`;

const FloatingButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const VectorStoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  box-sizing: border-box;
`;

interface VectorStoreContainerProps {
  isSelected: boolean;
}

const VectorStoreContainer = styled.div<VectorStoreContainerProps>`
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
