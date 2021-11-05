import {
    Button,
    Container,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { FC, Fragment } from 'react';
import { postQuery, postsQuery } from '../../lib/sanityQueries';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { GetStaticProps } from 'next';
import { IPost } from '../../lib/sanityTypes';
import Link from 'next/link';
import PostPageCard from '../../components/cards/PostPageCard';
import { sanityClient } from '../../lib/config';

type PostProps = {
    post: IPost;
};

const Post: FC<PostProps> = ({ post }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Fragment>
            <Link href={`/${post.category.slug.current}`} passHref>
                <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: isSmallScreen ? 15 : 23,
                        paddingLeft: 0,
                    }}
                    color="inherit"
                >
                    Back to category
                </Button>
            </Link>
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
