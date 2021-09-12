import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from 'store';
import globalTheme from 'styles/globalTheme';

function MyApp({ Component, pageProps }: AppProps) {
  // Create the store once in the client & For SSG and SSR always create a new store
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')!;
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          {/* PWA primary color */}
          <meta name="theme-color" content={globalTheme.palette.primary.main} />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" key='viewport' />
      </Head>
      <ThemeProvider theme={globalTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )

}
export default MyApp
