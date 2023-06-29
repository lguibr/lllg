import React from "react";
import styled from "styled-components";
import { Text } from "@/app/components/Text";

const Footer: React.FC = () => {
  return (
    <Container>
      <Text>Footer</Text>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
`;
