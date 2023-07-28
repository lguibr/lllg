import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#150050",
    secondary: "#3F0071",
    success: "#610094",
    danger: "#000000",
    warning: "#26005D", // interpolated
    info: "#4C0083", // interpolated
    light: "#080024", // interpolated
    dark: "#340086", // interpolated
    text: "#EEE", // interpolated
    white: "#00002A", // interpolated
    background: "#111",
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    monospace: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    "4xl": "4rem",
    "5xl": "4.5rem",
  },
  numericFontSizes: {
    xs: 0.75,
    sm: 0.875,
    md: 1,
    lg: 1.25,
    xl: 1.5,
    "2xl": 2,
    "3xl": 3,
    "4xl": 4,
    "5xl": 4.5,
  },
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
  shadows: {
    small: "0 0.0625rem 0 rgba(0, 0, 0, .1)",
    medium: "0 0.0625rem 0.125rem rgba(0, 0, 0, .1)",
    large: "0 0.0625rem 0.25rem rgba(0, 0, 0, .1)",
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.0125rem",
  },
  zIndices: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  borders: {
    none: 0,
    thin: "0.0625rem solid",
    thick: "0.125rem solid",
    thicker: "0.1875rem solid",
    thickest: "0.25rem solid",
  },
  radii: {
    none: "0",
    small: "0.125rem",
    medium: "0.25rem",
    large: "0.375rem",
    extraLarge: "0.5rem",
    full: "62.5rem",
  },
};

export default theme;
