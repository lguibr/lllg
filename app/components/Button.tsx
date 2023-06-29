import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonProps = {
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export const StyledButton = styled.button<ButtonProps>`
  width: max-content;
  background: ${({ theme, variant = "primary" }) =>
    theme.colors[variant] ?? theme.colors.primary};

  color: ${(props) => props.theme.colors.text};
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
  &:hover not(:disabled) {
    background-color: ${({ variant, theme }) =>
      variant === "primary" ? theme.colors.secondary : theme.colors.primary};
  }
  &:focus {
    outline: none;
  }
  border: 2px dotted green;
`;

export default StyledButton;
