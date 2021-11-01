import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { categoriesQuery, categoryQuery } from '../../lib/queries';
import { sanityClient } from '../../lib/sanity.server';
import { ICategory } from '../../lib/sanityTypes';

type CategoryProps = {
    category: ICategory;
};

const Category: FC<CategoryProps> = ({ category }) => {
    return <div>{category.title}</div>;
};

export default Category;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const category = await sanityClient.fetch<ICategory>(categoryQuery, {
        slug: params?.slug,
    });

    return {
        props: {
            category,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async ({}) => {
    const paths = await sanityClient.fetch<ICategory[]>(categoriesQuery);

    return {
        paths: paths.map(({ slug }) => ({ params: { slug: slug.current } })),
        fallback: true,
    };
};
