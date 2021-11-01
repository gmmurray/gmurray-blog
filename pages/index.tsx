import { GetStaticProps } from 'next';
import { FC } from 'react';
import { indexQuery } from '../lib/queries';
import { sanityClient } from '../lib/sanity.server';
import { IPost } from '../lib/sanityTypes';

type IndexProps = {
    posts: IPost[];
};

const Index: FC<IndexProps> = ({ posts }) => {
    console.log(posts);
    return <div>hi</div>;
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    const posts = await sanityClient.fetch(indexQuery);
    return {
        props: { posts },
    };
};
