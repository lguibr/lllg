import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../../public/theme";
import GlobalStyle from "../../components/globalStyles";

const LayoutTemplate: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default LayoutTemplate;
