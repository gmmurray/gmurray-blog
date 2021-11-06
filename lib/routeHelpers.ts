import { ICategory, IPost } from './sanityTypes';

import { blogTitle } from './staticContent';

export const getCategoryHref = (category: ICategory) =>
    `/${category.slug.current}`;
export const getPostHref = (post: IPost) =>
    `${post.category.slug.current}/${post.slug.current}`;

export const getPageTitle = (topic: string) => `${topic} - ${blogTitle}`;
