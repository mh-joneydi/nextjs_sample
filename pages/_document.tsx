/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable react/display-name */
import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from 'styles/globalTheme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fa">
        <Head>
          <link
            rel="preload"
            href="/assets/fonts/Yekan-Bakh-Thin.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/assets/fonts/Yekan-Bakh-Regular.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/assets/fonts/Yekan-Bakh-Medium.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/assets/fonts/Yekan-Bakh-Bold.woff"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/assets/fonts/Yekan-Bakh-Heavy.woff"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};