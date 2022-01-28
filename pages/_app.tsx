import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "components/AppLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import initMockAPI from "mocks";

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#001487",
    },
  },
});

if (process.env.NODE_ENV === 'development') {
  initMockAPI();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
