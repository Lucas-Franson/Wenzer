import React, { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { AuthContextProvider, ProtectRoute } from '../contexts/AuthContext';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/dist/client/router';

NProgress.configure({
  showSpinner: false, 
  trickRate: 0.1,
  trickSpeed: 300,
})

Router.events.on('routerChangeStart', () => {
  NProgress.start();
})

Router.events.on('routerChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routerChangeError', () => {
  NProgress.done();
});


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
    <>
      <Head>
        <title>Wenzer</title>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <ProtectRoute>
            <CssBaseline />
            <Component {...pageProps} />
          </ProtectRoute>
        </AuthContextProvider>
      </ThemeProvider>
      <style global jsx>
        {`
          #nprogress {
            position: relative;
            z-index: 9999999;
          }
          #nprogress .bar {
            background: #b732a2 !important;
            height: 3px;
          }
        `}
      </style>
    </>
  );
}
