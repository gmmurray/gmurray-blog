import { Container, Grid } from '@mui/material';
import {
    DEFAULT_POST_PAGE_SIZE,
    POST_ACTIONS_HEIGHT,
    POST_CONTENT_HEIGHT,
    POST_IMAGE_HEIGHT,
    POST_PIXEL_HEIGHT,
} from '../../lib/constants';
import { FC, Fragment, useCallback, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { categoriesQuery, categoryQuery } from '../../lib/sanityQueries';

import CategoryCard from '../../components/cards/CategoryCard';
import CategoryPostCards from '../../components/cards/CategoryPostCards';
import { ICategory } from '../../lib/sanityTypes';
import TopNavButton from '../../components/shared/TopNavButton';
import { sanityClient } from '../../lib/config';
import { useGetCategoryPosts } from '../../lib/queryHooks';

const pageSize = DEFAULT_POST_PAGE_SIZE;
const cardProps = {
    cardHeight: POST_PIXEL_HEIGHT,
    contentHeight: POST_CONTENT_HEIGHT,
    actionsHeight: POST_ACTIONS_HEIGHT,
    elevation: 3,
};
const cardImageHeight = POST_IMAGE_HEIGHT;

type CategoryProps = {
    category: ICategory;
};

const Category: FC<CategoryProps> = ({ category }) => {
    const [page, setPage] = useState(1);
    const [searchedValue, setSearchedValue] = useState('');
    const { data, isLoading } = useGetCategoryPosts(
        category.slug.current,
        page,
        pageSize,
        searchedValue,
    );

    const handleSearchSubmit = useCallback((value: string) => {
        setPage(1);
        setSearchedValue(value);
    }, []);

    const handleReset = useCallback(() => {
        setPage(1);
        setSearchedValue('');
    }, []);

    const handleNextPage = useCallback(() => setPage(page + 1), [page]);
    const handlePrevPage = useCallback(() => setPage(page - 1), [page]);

    const canClickNext = !!data && data.total > page * pageSize;
    const canClickPrev = page !== 1;

    return (
        <Fragment>
            <TopNavButton route="/" text="Back to home" />
            <Container sx={{ mt: 9, mb: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CategoryCard
                            category={category}
                            onSearchSubmit={handleSearchSubmit}
                            onReset={handleReset}
                            {...cardProps}
                        />
                    </Grid>
                    <CategoryPostCards
                        isLoading={isLoading}
                        data={data}
                        onNextPage={handleNextPage}
                        canClickNext={canClickNext}
                        onPrevPage={handlePrevPage}
                        canClickPrev={canClickPrev}
                        cardImageHeight={cardImageHeight}
                        {...cardProps}
                    />
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Category;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const category = await sanityClient.fetch<ICategory[]>(categoryQuery, {
        slug: params?.category,
    });

    return {
        props: {
            category: category[0],
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await sanityClient.fetch<ICategory[]>(categoriesQuery);

    return {
        paths: paths.map(({ slug }) => ({
            params: { category: slug.current },
        })),
        fallback: false,
    };
};
