"use client";

import React, { FormEvent, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import styled from "styled-components";

interface CodeEditorProps {
  code: string;
  handleSubmit: any;
  setValue: any;
  register: any;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  handleSubmit,
  setValue,
  register,
}) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    register("code");
  }, [register]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editorRef.current.setValue(code);
  };

  const handleEditorChange = (newValue: string) => {
    setValue("code", newValue);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const handler = handleSubmit((data) => {
      console.log(data.code);
    });
    handler();
  };

  return (
    <Form onSubmit={onSubmit}>
      <MonacoEditor
        language="markdown"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          automaticLayout: true,
        }}
      />
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};

export default CodeEditor;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 80vh;
  height: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
`;
