export const indexQuery = `
{
    "posts": *[_type == 'post'][0...5] | order(date desc, publishedAt desc) {
        ...,
        category->
    },
    "categories": *[_type == 'category' && defined(slug.current)] | order(title asc, _updatedat desc) {
        ...,
        "postCount": count(*[_type == 'post' && category->slug.current == ^.slug.current])
    }
}`;

export const categoryQuery = `
*[_type == 'category' && slug.current == $slug] | order(_updatedAt desc) {
    ...
}
`;

export const categoriesQuery = `
*[_type == 'category' && defined(slug.current)] {
    ...,
    "postCount": count(*[_type == 'post' && category->slug.current == ^.slug.current])
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
    "data": *[_type == 'post' && category->slug.current == $slug && title match $search][$start...$end] | order(publishedAt desc) {
        ...,
        category->
    },
    "total": count(*[_type == 'post' && category->slug.current == $slug])
}
`;
