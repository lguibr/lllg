import React, { useState } from "react";
import Modal from "@/app/components/Modal";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { vectorStoreQuery } from "@/app/lib/lllg";

export default function VectorStoreQueryModal({
  vectorStoreName,
  isOpen,
  onRequestClose,
}) {
  const [answer, setAnswer] = useState("");
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (request) => {
    const { data } = await vectorStoreQuery(
      vectorStoreName,
      { query: request.query },
      token
    );

    if (data instanceof Error) {
      console.error(data);
    } else {
      setAnswer(data);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
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
