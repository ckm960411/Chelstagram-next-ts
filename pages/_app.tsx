import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "components/AppLayout";
import { createTheme, ThemeProvider } from "@mui/material";

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#001487",
    },
  },
});

(async () => {
  const { worker } = await import('mocks/browser');
  worker.start();
})();

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
