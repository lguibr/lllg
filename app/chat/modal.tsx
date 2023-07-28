"use client";

import Modal from "@/app/components/Modal";

import styled from "styled-components";
import CodeEditor from "../components/CodeArea";
import { useForm } from "react-hook-form";
import MarkdownPreviewComponent from "../components/Markdown";
import { useState } from "react";

interface IFormInput {
  code: string;
}

export default function VectorStoreModal({ isOpen, onRequestClose }) {
  const { register, setValue, handleSubmit } = useForm<IFormInput>();
  const onSubmit = handleSubmit((data: IFormInput) => {
    console.log(data.code);
  });
  const [markdown, setMarkdown] = useState<string>("");
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Content>
        <MarkdownPreviewComponent
          markdown={markdown}
          setMarkdown={setMarkdown}
        />
        <CodeEditor
          code=""
          handleSubmit={onSubmit}
          setValue={setValue}
          register={register}
        />
      </Content>
    </Modal>
  );
}

const Content = styled.div`
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
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`;
