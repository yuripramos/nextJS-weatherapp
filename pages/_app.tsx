import React, { ReactChild } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../themes/index";
import { OptionsProvider } from "../context/defaultOptions";
import { QueryClient, QueryClientProvider } from "react-query";
import useHomeHandler from "./useHomeHandler";

export default function MyApp(props: any) {
  const { Component, pageProps } = props;
  const { myApplicationState, setUnit, onSubmitSearch } = useHomeHandler();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  function SafeHydrate({ children }: any) {
    return (
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : children}
      </div>
    );
  }

  const queryClient = new QueryClient();

  return (
    <SafeHydrate>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <OptionsProvider
            // @ts-ignore
            value={{ ...myApplicationState, setUnit, onSubmitSearch }}
          >
            <CssBaseline />
            <Component {...pageProps} />
          </OptionsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeHydrate>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
