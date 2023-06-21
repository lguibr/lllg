import styled, { css } from "styled-components";

const sizeStyles = {
  xsmall: "0.5em",
  small: "0.8em",
  medium: "1em",
  large: "1.4em",
  xlarge: "2em",
} as const;

interface TextProps {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "pre"
    | "sub"
    | "sup";
  capitalize?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  size?: keyof typeof sizeStyles;
  textDecoration?: "none" | "underline" | "line-through";
  transform?: "none" | "capitalize" | "uppercase" | "lowercase";
  weight?:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;
  fluid?: boolean;
}

export const Text = styled.p<TextProps>`
  ${({
    capitalize,
    uppercase,
    lowercase,
    fluid = true,
    size = "medium",
    textDecoration = "none",
    transform = "none",
    weight = "normal",
  }) => css`
    text-transform: ${capitalize
      ? "capitalize"
      : uppercase
      ? "uppercase"
      : lowercase
      ? "lowercase"
      : transform};
    text-decoration: ${textDecoration};
    font-weight: ${weight};
    font-size: ${fluid ? "clamp(1rem, 2vw, 1.5rem)" : sizeStyles[size]};
    font-family: "Inter", sans-serif;
    color: ${({ theme }) => theme.colors.text ?? "red"};
  `}
`;

export default Text;
