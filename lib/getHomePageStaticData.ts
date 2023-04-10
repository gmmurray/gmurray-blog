import { ICategory, IPost } from './sanityTypes';

import { IPortfolioContent } from '../types/portfolioContent';
import axios from 'axios';
import { indexQuery } from './sanityQueries';
import { sanityClient } from './config';

export type HomePageStaticData = {
    blog: {
        posts: IPost[];
        categories: ICategory[];
    };
    portfolio: IPortfolioContent;
};

export const getHomePageStaticData = async (): Promise<HomePageStaticData> => {
    const results = await Promise.all([getBlogData(), getPortfolioData()]);

    return {
        blog: results[0],
        portfolio: results[1],
    };
};

const getBlogData = async () =>
    await sanityClient.fetch<HomePageStaticData['blog']>(indexQuery);

const getPortfolioData = async () => {
    const url = process.env.PORTFOLIO_API_URL;
    const apiKey = process.env.PORTFOLIO_API_KEY;
    if (!url || !apiKey) {
        throw new Error('invalid environment config');
    }

    const response = await axios.get<{
        success: boolean;
        data: IPortfolioContent;
    }>(url, {
        headers: {
            'x-api-key': apiKey,
        },
    });

    return response.data.data;
};
