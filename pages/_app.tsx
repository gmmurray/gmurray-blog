import { CssBaseline, ThemeProvider } from '@mui/material';

import type { AppProps } from 'next/app';
import { Fragment } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { QueryClientProvider } from 'react-query';
import { muiTheme } from '../lib/muiTheme';
import { queryClient } from '../lib/config';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={muiTheme}>
            <Head>
                <title>blog</title>
            </Head>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default MyApp;
