import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Link as MUILink,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { Box } from '@mui/system';
import { FC } from 'react';
import { IPost } from '../../lib/sanityTypes';
import Link from 'next/link';
import PortableText from '../shared/PortableText';
import PostTags from './PostTags';
import ReactUtterances from 'react-utterances';
import { UTTERANCES_REPO } from '../../lib/constants';
import { formatDistanceToNow } from 'date-fns';
import { postPageStaticContent } from '../../lib/staticContent';
import { urlForImage } from '../../lib/sanity';

type PostPageCardProps = {
    post: IPost;
};

const PostPageCard: FC<PostPageCardProps> = ({ post }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const showUpdated = new Date(post.publishedAt) < new Date(post._updatedAt);

    return (
        <Card elevation={3}>
            <CardMedia
                sx={{
                    backgroundImage: `url(${urlForImage(post.mainImage)})`,
                    minHeight: '300px',
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    minHeight="300px"
                    padding={isSmallScreen ? 2 : 4}
                >
                    <Grid item>
                        <Typography variant="h4" color="white">
                            {post.title}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="white"
                            fontStyle="italic"
                        >
                            published{' '}
                            {formatDistanceToNow(new Date(post.publishedAt), {
                                addSuffix: true,
                            })}
                        </Typography>
                        <Typography variant="subtitle1" color="white">
                            in {post.category.title}
                        </Typography>
                    </Grid>
                    {post.mainImageSrc && (
                        <Grid item marginLeft="auto">
                            <Link href={post.mainImageSrc} passHref>
                                <MUILink
                                    target="_blank"
                                    rel="noopener"
                                    sx={{ color: 'white' }}
                                >
                                    Image source
                                </MUILink>
                            </Link>
                        </Grid>
                    )}
                </Grid>
            </CardMedia>
            <CardContent>
                <Grid container spacing={1} padding={isSmallScreen ? 0 : 4}>
                    <Grid item xs={12} width="100%" display="flex">
                        <Typography>
                            by {postPageStaticContent.author}
                        </Typography>
                        {showUpdated && (
                            <Typography marginLeft="auto" fontStyle="italic">
                                last updated{' '}
                                {formatDistanceToNow(
                                    new Date(post._updatedAt),
                                    {
                                        addSuffix: true,
                                    },
                                )}
                            </Typography>
                        )}
                    </Grid>
                    {!!post.tags && (
                        <Grid item xs={12}>
                            <PostTags tags={post.tags} />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Box>
                            <PortableText blocks={post.body} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactUtterances
                            repo={UTTERANCES_REPO}
                            type="pathname"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PostPageCard;
