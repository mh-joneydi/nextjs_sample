import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DocumentHead from 'components/globals/DocumentHead';
import Layout from 'components/layout';
import type { AppProps } from 'next/app'
import React from 'react';
import { Provider } from 'react-redux';
import { AppDispatch, useStore } from 'store';
import globalTheme from 'styles/globalTheme';
import 'styles/fonts.css'
import GlobalAlerts from 'components/globals/GlobalAlerts';
import GlobalDialog from 'components/globals/GlobalDialog';
import globalStorage from 'lib/globalStorage';

let dispatch: AppDispatch;

function MyApp({ Component, pageProps }: AppProps) {
  // Create the store once in the client & For SSG and SSR always create a new store
  const store = useStore(pageProps.initialReduxState);
  dispatch = store.dispatch;

  React.useEffect( () => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')!;
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, [] );

  return (
    <Provider store={store}>
      <DocumentHead />
      <ThemeProvider theme={globalTheme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GlobalAlerts />
        <GlobalDialog />
      </ThemeProvider>
    </Provider>
  )

}

export default MyApp
export { dispatch }; 
