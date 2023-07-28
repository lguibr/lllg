import theme from "@/public/theme";
import styled, { css } from "styled-components";

export interface TextProps {
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
  size?: keyof (typeof theme)["fontSizes"];
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
    size = "md",
    textDecoration = "none",
    transform = "none",
    weight = "normal",
    theme,
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
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text};
    font-size: ${fluid
      ? `clamp(${theme.numericFontSizes[size] ?? 1}rem, 1vw, ${
          theme.numericFontSizes[size] * 1.5 ?? 1.5
        }rem)})`
      : theme.fontSizes[size]};
  `}
`;

export default Text;
