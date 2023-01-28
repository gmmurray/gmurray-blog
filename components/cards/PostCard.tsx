import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';

import { CardComponentProps } from '../../lib/types';
import { FC } from 'react';
import { IPost } from '../../lib/sanityTypes';
import Link from 'next/link';
import PostTags from './PostTags';
import { formatDistanceToNow } from 'date-fns';
import { getBackgroundImageStyle } from '../../lib/imageHelpers';
import { getPostHref } from '../../lib/routeHelpers';
import { urlForImage } from '../../lib/sanity';

type PostCardProps = {
    post: IPost;
    imageHeight: number;
} & CardComponentProps;

const PostCard: FC<PostCardProps> = ({
    cardHeight,
    contentHeight,
    actionsHeight,
    elevation,
    imageHeight,
    post,
}) => (
    <Card elevation={elevation} sx={{ minHeight: cardHeight }}>
        <Link href={getPostHref(post)} passHref>
            <CardActionArea>
                <CardMedia
                    sx={{
                        backgroundImage: getBackgroundImageStyle(
                            urlForImage(post.mainImage),
                        ),
                        minHeight: imageHeight,
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        minHeight={imageHeight}
                        padding={2}
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
                                {formatDistanceToNow(
                                    new Date(post.publishedAt),
                                    { addSuffix: true },
                                )}
                            </Typography>
                            <Typography variant="subtitle1" color="white">
                                in {post.category.title}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardMedia>
                <CardContent sx={{ minHeight: contentHeight - imageHeight }}>
                    <Typography variant="body1">{post.summary}</Typography>
                </CardContent>
            </CardActionArea>
        </Link>
        <CardActions sx={{ minHeight: actionsHeight }}>
            <PostTags tags={post.tags} />
        </CardActions>
    </Card>
);

export default PostCard;
