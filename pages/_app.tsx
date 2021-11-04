import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
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
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </Fragment>
    );
}

export default MyApp;
