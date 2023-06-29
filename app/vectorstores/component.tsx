"use client";

import { useVectorStores } from "@/app/contexts/vectorStore";
import { Text } from "@/app/components/Text";
import styled from "styled-components";
import FileGrid from "@/app/components/FileGrid";
import { useState } from "react";
import VectorStoreQueryModal from "./modal";
import Button from "@/app/components/Button";

export default function VectorStores(): JSX.Element {
  const {
    vectorStores,
    selectedVectorStores,
    handleVectorStoreSelect,
    handleVectorStoreDelete,
  } = useVectorStores();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <VectorStoresContainer>
      <Text as="h2">Existing Vector Stores</Text>
      <VectorStoreGrid>
        {vectorStores.map((vectorStore, index) =>
          Object.entries(vectorStore).map(
            ([key, vectorStoreData], index: number) => (
              <VectorStoreContainer
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleVectorStoreSelect(key);
                }}
                isSelected={selectedVectorStores.includes(vectorStoreData.name)}
              >
                <Text uppercase weight={"bolder"} size="xsmall">
                  {vectorStoreData.name}
                </Text>
                <Text size="xsmall">{vectorStoreData.description}</Text>
                <FileGrid files={vectorStoreData.contexts} />
                <DeleteButton
                  onClick={(e) => {
                    console.log("delete vectorStore");
                    e.stopPropagation();
                    e.preventDefault();
                    handleVectorStoreDelete(key);
                  }}
                >
                  X
                </DeleteButton>
              </VectorStoreContainer>
            )
          )
        )}
      </VectorStoreGrid>

      <FloatingButtonContainer>
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log(selectedVectorStores);

            if (!!selectedVectorStores.length) openModal();
          }}
          disabled={!selectedVectorStores.length}
        >
          Make a question for a context
        </Button>
      </FloatingButtonContainer>

      <VectorStoreQueryModal
        vectorStoreName={selectedVectorStores[0]}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </VectorStoresContainer>
  );
}

const VectorStoresContainer = styled.div`
  border: 12px dotted red;
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
  border: 2px dotted green;
  bottom: 20px;
  right: 20px;
`;

const VectorStoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  border: 8px dotted orange;
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
