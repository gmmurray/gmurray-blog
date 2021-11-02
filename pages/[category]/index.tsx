import { FC, SyntheticEvent, useCallback, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { categoriesQuery, categoryQuery } from '../../lib/sanityQueries';

import { DEFAULT_POST_PAGE_SIZE } from '../../lib/constants';
import { ICategory } from '../../lib/sanityTypes';
import Link from 'next/link';
import { getPostHref } from '../../lib/routeHelpers';
import { sanityClient } from '../../lib/config';
import { useGetCategoryPosts } from '../../lib/queryHooks';

const pageSize = DEFAULT_POST_PAGE_SIZE;

type CategoryProps = {
    category: ICategory;
};

const Category: FC<CategoryProps> = ({ category }) => {
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [searchedValue, setSearchedValue] = useState('');
    const { data, isLoading } = useGetCategoryPosts(
        category.slug.current,
        page,
        pageSize,
        searchedValue,
    );

    const handleSearchChange = useCallback(
        (event: SyntheticEvent<HTMLInputElement>) =>
            setSearchInput(event.currentTarget.value),
        [],
    );

    const handleSearchSubmit = useCallback(() => {
        setPage(1);
        setSearchedValue(searchInput);
    }, [searchInput]);

    const handleReset = useCallback(() => {
        setPage(1);
        setSearchedValue('');
        setSearchInput('');
    }, []);

    const handleNextPage = useCallback(() => setPage(page + 1), [page]);
    const handlePrevPage = useCallback(() => setPage(page - 1), [page]);

    const canClickNext = data && data.total > page * pageSize;
    const canClickPrev = page !== 1;

    const renderContent = () => {
        if (isLoading) return <div>loading...</div>;
        else if (!data || data.data.length === 0) return <div>no data</div>;

        return data.data.map(post => (
            <div key={post._id}>
                <Link href={getPostHref(post)}>{post.title}</Link>
            </div>
        ));
    };
    return (
        <div>
            <div>
                <Link href="/">back</Link>
            </div>
            <div>
                <h1>{category.title}</h1>
                <p>{category.description}</p>
            </div>
            <hr />
            <div>
                <input
                    type="text"
                    onChange={handleSearchChange}
                    value={searchInput}
                />
                <button onClick={handleSearchSubmit}>search</button>
                <button onClick={handleReset}>reset</button>
            </div>
            <div>{renderContent()}</div>
            <div>
                <button disabled={!canClickPrev} onClick={handlePrevPage}>
                    prev
                </button>
                <button
                    disabled={!canClickNext}
                    onClick={handleNextPage}
                    style={{ marginLeft: '1rem' }}
                >
                    next
                </button>
            </div>
        </div>
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
