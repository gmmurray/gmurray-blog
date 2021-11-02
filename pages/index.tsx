import { ICategory, IPost } from '../lib/sanityTypes';
import { getCategoryHref, getPostHref } from '../lib/routeHelpers';

import { FC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { indexQuery } from '../lib/sanityQueries';
import { sanityClient } from '../lib/config';

type IndexProps = {
    posts: IPost[];
    categories: ICategory[];
};

const Index: FC<IndexProps> = ({ posts, categories }) => {
    return (
        <div>
            <div>
                <h3>categories</h3>
                <ul>
                    {categories.map(c => (
                        <li key={c._id}>
                            <Link href={getCategoryHref(c)}>{c.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <hr />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {posts.map(p => (
                    <div key={p._id} style={{ flexBasis: 1 }}>
                        <Link href={getPostHref(p)}>{p.title}</Link>
                        <ul>
                            <li>{p.category.title}</li>
                            <li>{p.summary}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    const result = await sanityClient.fetch(indexQuery);
    return {
        props: { ...result },
    };
};
