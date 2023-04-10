import { Container, Grid, Grow } from '@mui/material';
import {
    HomePageStaticData,
    getHomePageStaticData,
} from '../lib/getHomePageStaticData';
import {
    POST_ACTIONS_HEIGHT,
    POST_CONTENT_HEIGHT,
    POST_IMAGE_HEIGHT,
    POST_PIXEL_HEIGHT,
    POST_TRANSITION_DURATION,
} from '../lib/constants';

import AuthorCard from '../components/cards/AuthorCard';
import { FC } from 'react';
import { GetStaticProps } from 'next';
import IntroductionCard from '../components/cards/IntroductionCard';
import PostCard from '../components/cards/PostCard';

const cardImageHeight = POST_IMAGE_HEIGHT;

const cardProps = {
    cardHeight: POST_PIXEL_HEIGHT,
    contentHeight: POST_CONTENT_HEIGHT,
    actionsHeight: POST_ACTIONS_HEIGHT,
    elevation: 3,
};

type IndexProps = {} & HomePageStaticData;

const Index: FC<IndexProps> = ({
    blog: { posts, categories },
    portfolio: { about },
}) => {
    return (
        <Container sx={{ mt: 3, mb: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <AuthorCard {...cardProps} portfolioContent={about} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <IntroductionCard {...cardProps} categories={categories} />
                </Grid>
                {posts.map(p => (
                    <Grow key={p._id} in timeout={POST_TRANSITION_DURATION}>
                        <Grid key={p._id} item xs={12}>
                            <PostCard
                                key={p._id}
                                post={p}
                                imageHeight={cardImageHeight}
                                {...cardProps}
                            />
                        </Grid>
                    </Grow>
                ))}
            </Grid>
        </Container>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    const data = await getHomePageStaticData();

    return {
        props: { ...data },
    };
};
