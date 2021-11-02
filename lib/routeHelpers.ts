import { ICategory, IPost } from './sanityTypes';

export const getCategoryHref = (category: ICategory) =>
    `/${category.slug.current}`;
export const getPostHref = (post: IPost) =>
    `${post.category.slug.current}/${post.slug.current}`;
