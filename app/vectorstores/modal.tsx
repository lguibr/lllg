import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { vectorStoreQuery } from "@/lib/lllg";

export default function VectorStoreQueryModal({
  vectorStoreName,
  isOpen,
  onRequestClose,
}) {
  const [answer, setAnswer] = useState(null);
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await vectorStoreQuery(
      vectorStoreName,
      { query: data.query },
      token
    );
    if (response instanceof Error) {
      console.error(response);
    } else {
      setAnswer(response.answer);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Vector Store Query"
    >
      <Form
        onSubmit={(e) => {
          e.stopPropagation();
          const submit = handleSubmit(onSubmit);
          submit(e);
        }}
      >
        <h2>Query Vector Store</h2>
        <input {...register("query", { required: true })} placeholder="Query" />
        {errors.query && <span>This field is required</span>}

        <button type="submit">Send</button>
        {answer && <p>{answer}</p>}
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
