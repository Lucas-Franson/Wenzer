import React, { useEffect } from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../theme';
import Layout from '../components/Layout';
import { AuthContextProvider } from '../contexts/AuthContext';
import Head from 'next/head';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Wenzer</title>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <AuthContextProvider>
        <Layout>
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
