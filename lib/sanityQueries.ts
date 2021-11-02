const postFields = `
_id,
title,
slug,
mainImage,
mainImageSrc,
category,
tags,
publishedAt,
body,
summary
`;

const categoryFields = `
title,
slug,
description
`;

export const indexQuery = `
{
    "posts": *[_type == 'post'][0...5] | order(date desc, _updatedAt desc) {
        ...,
        category->
    },
    "categories": *[_type == 'category' && defined(slug.current)] | order(title asc, _updatedat desc) {
        ...
    }
}`;

export const categoryQuery = `
*[_type == 'category' && slug.current == $slug] | order(_updatedAt desc) {
    ...
}
`;

export const categoriesQuery = `
*[_type == 'category' && defined(slug.current)] {
    ...
}
`;

export const postQuery = `
*[_type == 'post' && slug.current == $slug] | order(_updatedAt desc) {
    ...,
    category->
}
`;

export const postsQuery = `
*[_type == 'post'] | order(_updatedAt desc) {
    ...,
    category->
}
`;

export const categoryPostsQuery = `
{
    "data": *[_type == 'post' && category->slug.current == $slug && title match $search][$start...$end] | order(_updatedAt desc) {
        ...,
        category->
    },
    "total": count(*[_type == 'post' && category->slug.current == $slug])
}
`;
