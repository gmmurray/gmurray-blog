import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    Container,
    Grid,
} from '@mui/material';
import { FC, Fragment } from 'react';
import { ICategory, IPost } from '../lib/sanityTypes';
import {
    POST_ACTIONS_HEIGHT,
    POST_CONTENT_HEIGHT,
    POST_IMAGE_HEIGHT,
    POST_PIXEL_HEIGHT,
} from '../lib/constants';
import { getCategoryHref, getPostHref } from '../lib/routeHelpers';

import AuthorCard from '../components/AuthorCard';
import { Box } from '@mui/system';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import IntroductionCard from '../components/IntroductionCard';
import Link from 'next/link';
import NextSanityImage from '../components/NextSanityImage';
import PostCard from '../components/PostCard';
import { indexQuery } from '../lib/sanityQueries';
import { sanityClient } from '../lib/config';

const cardMinHeight = POST_PIXEL_HEIGHT;
const cardContentHeight = POST_CONTENT_HEIGHT;
const cardActionsHeight = POST_ACTIONS_HEIGHT;
const cardImageHeight = POST_IMAGE_HEIGHT;
const cardElevation = 3;

type IndexProps = {
    posts: IPost[];
    categories: ICategory[];
};

const Index: FC<IndexProps> = ({ posts, categories }) => {
    const cardProps = {
        cardHeight: cardMinHeight,
        contentHeight: cardContentHeight,
        actionsHeight: cardActionsHeight,
        elevation: cardElevation,
    };
    return (
        <Fragment>
            <Container sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <AuthorCard {...cardProps} />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <IntroductionCard
                            {...cardProps}
                            categories={categories}
                        />
                    </Grid>
                    {posts.map(p => (
                        <Grid key={p._id} item xs={12}>
                            <PostCard
                                key={p._id}
                                post={p}
                                imageHeight={cardImageHeight}
                                {...cardProps}
                            />
                            {/* <Box
                                sx={{
                                    border: '2px solid black',
                                    minHeight: POST_PIXEL_HEIGHT,
                                }}
                            >
                                <NextSanityImage
                                    media={p.mainImage}
                                    height={500}
                                    width={500}
                                    alt=""
                                    responsive
                                />
                                <Link href={getPostHref(p)}>{p.title}</Link>
                                <ul>
                                    <li>{p.category.title}</li>
                                    <li>{p.summary}</li>
                                </ul>
                            </Box> */}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
    const result = await sanityClient.fetch(indexQuery);
    return {
        props: { ...result },
    };
};
