import { Container, Grid } from '@mui/material';
import { FC, Fragment } from 'react';
import { postQuery, postsQuery } from '../../lib/sanityQueries';

import { GetStaticProps } from 'next';
import { IPost } from '../../lib/sanityTypes';
import PostPageCard from '../../components/cards/PostPageCard';
import TopNavButton from '../../components/shared/TopNavButton';
import { sanityClient } from '../../lib/config';

type PostProps = {
    post: IPost;
};

const Post: FC<PostProps> = ({ post }) => {
    return (
        <Fragment>
            <TopNavButton
                route={`/${post.category.slug.current}`}
                text="Back to category"
            />
            <Container sx={{ mt: 9, mb: 3 }}>
                <Grid container spacing={3}>
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
