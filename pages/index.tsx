import { Container, Grid } from '@mui/material';
import { FC, Fragment } from 'react';
import { ICategory, IPost } from '../lib/sanityTypes';
import {
    POST_ACTIONS_HEIGHT,
    POST_CONTENT_HEIGHT,
    POST_IMAGE_HEIGHT,
    POST_PIXEL_HEIGHT,
} from '../lib/constants';

import AuthorCard from '../components/AuthorCard';
import { GetStaticProps } from 'next';
import IntroductionCard from '../components/IntroductionCard';
import PostCard from '../components/PostCard';
import { indexQuery } from '../lib/sanityQueries';
import { sanityClient } from '../lib/config';

const cardImageHeight = POST_IMAGE_HEIGHT;

const cardProps = {
    cardHeight: POST_PIXEL_HEIGHT,
    contentHeight: POST_CONTENT_HEIGHT,
    actionsHeight: POST_ACTIONS_HEIGHT,
    elevation: 3,
};

type IndexProps = {
    posts: IPost[];
    categories: ICategory[];
};

const Index: FC<IndexProps> = ({ posts, categories }) => {
    return (
        <Container sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <AuthorCard {...cardProps} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <IntroductionCard {...cardProps} categories={categories} />
                </Grid>
                {posts.map(p => (
                    <Grid key={p._id} item xs={12}>
                        <PostCard
                            key={p._id}
                            post={p}
                            imageHeight={cardImageHeight}
                            {...cardProps}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    const result = await sanityClient.fetch(indexQuery);
    return {
        props: { ...result },
    };
};
