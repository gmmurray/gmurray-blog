import { CssBaseline, ThemeProvider } from '@mui/material';
import '../styles.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { QueryClientProvider } from 'react-query';
import { blogTitle } from '../lib/staticContent';
import { muiTheme } from '../lib/muiTheme';
import { queryClient } from '../lib/config';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={muiTheme}>
            <Head>
                <title>{blogTitle}</title>
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
