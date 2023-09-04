import '../styles.scss';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { baseWebsiteUrl, blogTitle } from '../lib/staticContent';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Fragment } from 'react';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import Layout from '../components/layout/Layout';
import { QueryClientProvider } from 'react-query';
import { muiTheme } from '../lib/muiTheme';
import { queryClient } from '../lib/config';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            {process.env.NODE_ENV !== 'development' && (
                <GoogleAnalytics trackPageViews />
            )}
            <DefaultSeo
                title="Welcome"
                titleTemplate={`%s | ${blogTitle}`}
                description="Explore the world of software development and life through the eyes of Greg, a passionate software engineer. Join him as he shares experiences, insights, and a touch of humanity in technology."
                openGraph={{
                    type: 'website',
                    url: baseWebsiteUrl,
                    images: [
                        {
                            url: `${baseWebsiteUrl}/favicon.ico`,
                            width: 250,
                            height: 250,
                            alt: `Greg's Blog logo`,
                        },
                    ],
                }}
            />
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <QueryClientProvider client={queryClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </QueryClientProvider>
            </ThemeProvider>
        </Fragment>
    );
}

export default MyApp;
