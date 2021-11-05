import { IPost } from './sanityTypes';
import { categoryPostsQuery } from './sanityQueries';
import { sanityClient } from '../lib/config';
import { useQuery } from 'react-query';

export type CategoryPostResponse = {
    data: IPost[];
    total: number;
};

const getCategoryPosts = async (
    slug: string,
    currPage: number,
    count: number,
    search: string = '',
) => {
    const searchString = '*' + search + '*';
    const start = (currPage - 1) * count;
    const end = start + count;
    return await sanityClient.fetch<CategoryPostResponse>(categoryPostsQuery, {
        slug,
        search: searchString,
        start,
        end,
    });
};
export const getCategoryPostsKey = (
    slug: string,
    currPage: number,
    count: number,
    search?: string,
) => ['posts', slug, search, currPage, count];
export const useGetCategoryPosts = (
    slug: string,
    currPage: number,
    count: number,
    search?: string,
) =>
    useQuery(
        getCategoryPostsKey(slug, currPage, count, search),
        () => getCategoryPosts(slug, currPage, count, search),
        {
            enabled: slug !== '',
            keepPreviousData: true,
        },
    );
