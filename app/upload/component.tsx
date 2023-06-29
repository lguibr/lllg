import { useUpload } from "@/app/contexts/files";
import { Text } from "@/app/components/Text";
import styled from "styled-components";
import Button from "@/app/components/Button";
import ContextModal from "./modal";
import { useState } from "react";
import FileGrid from "@/app/components/FileGrid";

export default function Upload() {
  const {
    files,
    uploadedFiles,
    selectedUploadedFiles,
    setSelectedUploadedFiles,
    uploading,
    handleDragOver,
    handleDrop,
    handleFileChange,
    handleClick,
    handleFormSubmit,
    fileInputRef,
    handleDelete,
  } = useUpload();

  const handleFileSelect = (file: string) => {
    if (selectedUploadedFiles.includes(file)) {
      setSelectedUploadedFiles(selectedUploadedFiles.filter((f) => f !== file));
    } else {
      setSelectedUploadedFiles([...selectedUploadedFiles, file]);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Text as="h2">Already uploaded files</Text>
      <FileGrid
        files={uploadedFiles}
        onFileDelete={handleDelete}
        onFileSelect={handleFileSelect}
        selectedFiles={selectedUploadedFiles}
      />

      <Text as="h2">Files to be uploaded</Text>
      <UploadArea
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <Text>Drag and drop files here or click to select files</Text>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </UploadArea>
      <FileGrid files={files}></FileGrid>
      <FloatingButtonContainer>
        <Button disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            console.log(selectedUploadedFiles);

            if (!!selectedUploadedFiles.length) openModal();
          }}
          disabled={uploading || !selectedUploadedFiles.length}
        >
          {uploading ? "Creating Context..." : "Create Context"}
        </Button>
      </FloatingButtonContainer>
      <ContextModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  border: 12px dotted red;
  min-height: 100%;
  height: max-content;
  box-sizing: border-box;
  display: grid;
  grid-auto-rows: auto;
  padding: 10%;
`;

const UploadArea = styled.div`
  min-height: 300px;
  border: 2px dashed #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const FloatingButtonContainer = styled.div`
  position: absolute;
  border: 2px dotted green;
  bottom: 20px;
  right: 20px;
`;
