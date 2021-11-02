import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { Fragment } from 'react';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../lib/config';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <Head>
                <title>blog</title>
            </Head>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </Fragment>
    );
}

export default MyApp;
