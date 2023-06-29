import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import GlobalStyle from "@/app/components/globalStyles";

const theme: DefaultTheme = {
  colors: {
    background: "#111",
    primary: "#111",
    secondary: "#0070f3",
    text: "#333",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  console.log("App");
  console.log("theme");
  console.log(theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
