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
*[_type == 'post'][0...5] | order(date desc, _updatedAt desc) {
    ...,
    category->
}`;

export const categoryQuery = `
*[_type == 'category' && slug.current == $slug][0] | order(_updatedAt desc) {
    ...
}
`;

export const categoriesQuery = `
*[_type == 'category' && defined(slug.current)] {
    ...
}
`;
