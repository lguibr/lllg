import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useContexts } from "@/contexts/contexts";
import styled from "styled-components";
import ContextGrid from "@/components/FileGrid";

export default function VectorStoreModal({ isOpen, onRequestClose }) {
  const { selectedContexts, handleCreateVectorStore } = useContexts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleCreateVectorStore({
      name: data.name,
      description: data.description,
      contexts: selectedContexts,
    });
    console.log(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Vector Store"
    >
      <Form
        onSubmit={(e) => {
          e.stopPropagation();
          const submit = handleSubmit(onSubmit);
          submit(e);
        }}
      >
        <h2>Create Vector Store</h2>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <span>This field is required</span>}

        <textarea
          rows={4}
          {...register("description", { required: true, maxLength: 128 })}
          placeholder="Description"
        />
        {errors.description && <span>This field is required</span>}
        <ContextGrid files={selectedContexts} />
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
