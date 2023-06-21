"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GlobalStyle from "@/components/globalStyles";

import styled, { DefaultTheme, ThemeProvider } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    background: "#111",
    text: "white",
    primary: "#111",
    secondary: "#0070f3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <html lang="en">
        <Body>
          <Header />
          {children}
          <Footer />
        </Body>
      </html>
    </ThemeProvider>
  );
}

const Body = styled.body`
  background-color: ${({ theme }) => theme.colors?.background ?? "blue"}};
  box-sizing: border-box;
  border: 2px dotted blue;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
`;
