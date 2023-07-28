import "styled-components";

declare module "styled-components" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      warning: string;
      info: string;
      light: string;
      dark: string;
      text: string;
      white: string;
      background: string;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fonts: {
      body: string;
      heading: string;
      monospace: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      "4xl": string;
      "5xl": string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    lineHeights: {
      body: number;
      heading: number;
    };
    letterSpacings: {
      body: string;
      caps: string;
    };
    zIndices: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
    borders: {
      none: number;
      thin: string;
      thick: string;
      thicker: string;
      thickest: string;
    };
    radii: {
      none: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
      full: string;
    };
  }
}
