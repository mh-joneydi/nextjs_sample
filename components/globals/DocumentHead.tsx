import Head from 'next/head';
import React, { memo } from 'react'
import globalTheme from 'styles/globalTheme';

function DocumentHead() {
    return (
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          {/* PWA primary color */}
          <meta name="theme-color" content={globalTheme.palette.primary.main} />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" key='viewport' />
        </Head>
    )
}

export default memo(DocumentHead);
