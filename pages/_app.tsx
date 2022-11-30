import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/utils/create-emotion-cache";
import { AppProps } from "next/app";
import { NextPage } from "next";
import type { EmotionCache } from "@emotion/cache";
import "../styles/index.css";
import Layout from "../src/layout/Layout";
import { JobProvider } from "../src/context/JobContext";

const clientSideEmotionCache = createEmotionCache();

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

export default function _App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <JobProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </JobProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
