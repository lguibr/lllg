import React from "react";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";

interface MarkdownPreviewComponentProps {
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
}

const MarkdownPreviewComponent: React.FC<MarkdownPreviewComponentProps> = ({
  markdown,
  setMarkdown,
}) => {
  // Assuming you want to update the markdown when the component is clicked.
  // You can change this to fit your requirements.
  const handleClick = () => {
    const newMarkdown = `
# Updated markdown text

## This is a subheading

This is a paragraph

${createCodeBlock("const a = 1;")}
`;

    setMarkdown(newMarkdown);
  };

  return (
    <Container onClick={handleClick}>
      <Markdown>{markdown}</Markdown>
    </Container>
  );
};

export default MarkdownPreviewComponent;

const Container = styled.div`
  width: 100%;
`;

const createCodeBlock = (code: string, language: string = "javascript") => `
\`\`\`${language}
${code}
\`\`\`
`;
