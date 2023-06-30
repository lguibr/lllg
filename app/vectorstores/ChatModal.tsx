import Modal from "react-modal";
import { useForm, useFieldArray } from "react-hook-form";
import styled from "styled-components";

import { useRetrievers } from "@/app/contexts/retrievers";
import { useVectorStores } from "@/app/contexts/vectorStore";
import { useEffect } from "react";

const retrieverTypes = ["rank", "stuff", "refine", "map"];

export default function RetrieverModal({ isOpen, onRequestClose }) {
  const { handleCreateRetriever } = useRetrievers();
  const { selectedVectorStores, vectorStores } = useVectorStores();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "retrievers",
  });

  // Reset the form with the initial values when the modal is opened
  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        description: "",
        retrievers: selectedVectorStores.map((store) => ({
          vectorStore: store,
          retrieverType: "",
        })),
      });
    }
  }, [isOpen, reset, selectedVectorStores]);

  const onSubmit = (data) => {
    handleCreateRetriever({
      name: data.name,
      description: data.description,
      retrievers: data.retrievers,
    });
    console.log(data);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Retriever"
    >
      <Form
        onSubmit={(e) => {
          e.stopPropagation();
          const submit = handleSubmit(onSubmit);
          submit(e);
        }}
      >
        <h2>Create Retriever</h2>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <span>This field is required</span>}

        <textarea
          rows={4}
          {...register("description", { required: true, maxLength: 128 })}
          placeholder="Description"
        />
        {errors.description && <span>This field is required</span>}

        {fields.map((field, index) => (
          <div key={field.id}>
            <select
              {...register(`retrievers.${index}.vectorStore`, {
                required: true,
              })}
            >
              {vectorStores.map((store) => (
                <option value={store.name}>{store.name}</option>
              ))}
            </select>
            {errors.retrievers?.[index]?.vectorStore && (
              <span>This field is required</span>
            )}

            <select
              {...register(`retrievers.${index}.retrieverType`, {
                required: true,
              })}
            >
              {retrieverTypes.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </select>
            {errors.retrievers?.[index]?.retrieverType && (
              <span>This field is required</span>
            )}

            <button onClick={() => remove(index)}>Remove</button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ vectorStore: "", retrieverType: "" })}
        >
          Add retriever
        </button>

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
