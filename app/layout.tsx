"use client";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import GlobalStyle from "@/app/components/globalStyles";
import theme from "@/public/theme";

import styled, { ThemeProvider } from "styled-components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Body>
          <Header />
          {children}
          <Footer />
        </Body>
      </ThemeProvider>
    </html>
  );
}

const Body = styled.body`
  background-color: ${({ theme }) => theme.colors?.background ?? "blue"}};
  box-sizing: border-box;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
`;
