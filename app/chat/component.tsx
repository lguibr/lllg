import { useRetrievers } from "@/app/contexts/retrievers";
import { Text } from "@/app/components/Text";
import styled from "styled-components";
import Button from "@/app/components/Button";
import { useState } from "react";

export default function Retrievers(): JSX.Element {
  const {
    retrievers,
    selectedRetrievers,
    handleRetrieverSelect,
    handleRetrieverDelete,
  } = useRetrievers();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <RetrieversContainer>
      <Text as="h2">Existing Retrievers</Text>
      <RetrieverGrid>
        {retrievers.map((retriever, index) =>
          Object.entries(retriever).map(
            ([key, retrieverData], index: number) => (
              <RetrieverContainer
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleRetrieverSelect(key);
                }}
                isSelected={selectedRetrievers.includes(retrieverData.name)}
              >
                <Text uppercase weight={"bolder"} size="xsmall">
                  {retrieverData.name}
                </Text>
                <Text size="xsmall">{retrieverData.description}</Text>
                <DeleteButton
                  onClick={(e) => {
                    console.log("delete retriever");
                    e.stopPropagation();
                    e.preventDefault();
                    handleRetrieverDelete(key);
                  }}
                >
                  X
                </DeleteButton>
              </RetrieverContainer>
            )
          )
        )}
      </RetrieverGrid>

      <FloatingButtonContainer>
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log(selectedRetrievers);

            if (!!selectedRetrievers.length) openModal();
          }}
          disabled={!selectedRetrievers.length}
        >
          Create Retriever
        </Button>
      </FloatingButtonContainer>
    </RetrieversContainer>
  );
}

const FloatingButtonContainer = styled.div`
  position: absolute;
  border: 2px dotted green;
  bottom: 20px;
  right: 20px;
`;

const RetrieversContainer = styled.div`
  border: 12px dotted red;
  min-height: 500px;
  height: max-content;
  box-sizing: border-box;
  display: grid;
  grid-auto-rows: auto;
  padding: 10%;
`;

const RetrieverGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  border: 8px dotted orange;
  box-sizing: border-box;
`;

interface RetrieverContainerProps {
  isSelected: boolean;
}

const RetrieverContainer = styled.div<RetrieverContainerProps>`
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
