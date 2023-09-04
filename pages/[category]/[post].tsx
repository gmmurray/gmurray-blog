import { Container, Grid } from '@mui/material';
import { FC, Fragment } from 'react';
import { postQuery, postsQuery } from '../../lib/sanityQueries';

import { GetStaticProps } from 'next';
import { IPost } from '../../lib/sanityTypes';
import { NextSeo } from 'next-seo';
import PageNav from '../../components/shared/PageNav';
import PostPageCard from '../../components/cards/PostPageCard';
import { baseWebsiteUrl } from '../../lib/staticContent';
import { getPostHref } from '../../lib/routeHelpers';
import { sanityClient } from '../../lib/config';

type PostProps = {
    post: IPost;
};

const Post: FC<PostProps> = ({ post }) => {
    return (
        <Fragment>
            <NextSeo
                title={post.title}
                description={post.summary}
                openGraph={{
                    url: `${baseWebsiteUrl}/${getPostHref(post)}`,
                }}
            />
            <Container sx={{ mt: 1, mb: 3 }}>
                <PageNav post={post} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PostPageCard post={post} />
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post = await sanityClient.fetch<IPost[]>(postQuery, {
        slug: params?.post,
    });

    return {
        props: {
            post: post[0],
        },
    };
};

export const getStaticPaths = async () => {
    const paths = await sanityClient.fetch<IPost[]>(postsQuery);
    return {
        paths: paths.map(({ slug, category }) => ({
            params: { post: slug.current, category: category.slug.current },
        })),
        fallback: false,
    };
};
