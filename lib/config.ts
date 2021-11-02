import { QueryClient } from 'react-query';
import { createClient } from 'next-sanity';

export const sanityConfig = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    useCdn: process.env.NODE_ENV === 'production',
    apiVersion: '2021-10-31',
};

export const sanityClient = createClient(sanityConfig);

export const queryClient = new QueryClient();
