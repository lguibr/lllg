import styled, { css } from "styled-components";
import { Text } from "@/app/components/Text";

interface FileGridProps {
  files: File[] | string[];
  selectedFiles?: string[];
  onFileSelect?: (file: string) => void;
  onFileDelete?: (file: string) => void;
}

const FileGrid: React.FC<FileGridProps> = ({
  files,
  selectedFiles,
  onFileSelect,
  onFileDelete,
}) => {
  return (
    <FileGridContainer>
      {files.map((file, index) => {
        const fileName = file instanceof File ? file.name : file;
        return (
          <FileContainer
            onClick={() => onFileSelect && onFileSelect(file)}
            isSelected={selectedFiles?.includes(fileName)}
            key={index}
          >
            <FileIcon src="/file.svg" alt="file icon" />
            <Text weight={"bolder"} size="xsmall">
              {fileName}
            </Text>
            {onFileDelete && (
              <DeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onFileDelete(file);
                }}
              >
                X
              </DeleteButton>
            )}
          </FileContainer>
        );
      })}
    </FileGridContainer>
  );
};

const FileContainer = styled.div<{ isSelected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  border: 2px solid #aaa;
  max-width: 100%;
  text-align: center;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 2px solid blue;
    `}
  &:hover button {
    opacity: 1;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  width: 30px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s ease;
`;

const FileGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  border: 8px dotted orange;
  box-sizing: border-box;
`;

const FileIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export default FileGrid;
