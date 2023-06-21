import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useUpload } from "@/contexts/files";
import styled from "styled-components";
import { useEffect } from "react";
import FileGrid from "@/components/FileGrid";

export default function ContextModal({ isOpen, onRequestClose }) {
  const { selectedUploadedFiles, handleCreateContext } = useUpload();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleCreateContext({
      name: data.name,
      description: data.description,
      files: selectedUploadedFiles,
    });
    console.log(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Context"
    >
      <Form
        onSubmit={(e) => {
          e.stopPropagation();
          const submit = handleSubmit(onSubmit);
          submit(e);
        }}
      >
        <h2>Create Context</h2>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <span>This field is required</span>}

        <textarea
          rows={4}
          {...register("description", { required: true, maxLength: 128 })}
          placeholder="Description"
        />
        {errors.description && <span>This field is required</span>}
        <FileGrid files={selectedUploadedFiles} />
        <button type="submit">Create</button>
      </Form>
    </Modal>
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
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  * {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;
