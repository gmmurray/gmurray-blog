import {
    Button,
    Card,
    CardActions,
    CardMedia,
    Typography,
} from '@mui/material';
import { introAuthoImgSrc, introAuthorText } from '../lib/staticContent';

import { Box } from '@mui/system';
import { CardComponentProps } from '../lib/types';
import { FC } from 'react';
import Link from 'next/link';

type AuthorCardProps = {} & CardComponentProps;

const AuthorCard: FC<AuthorCardProps> = ({
    cardHeight,
    contentHeight,
    actionsHeight,
    elevation,
}) => (
    <Card
        elevation={elevation}
        sx={{
            minHeight: cardHeight,
        }}
    >
        <CardMedia
            component="img"
            src={introAuthoImgSrc}
            alt={`${introAuthorText} image`}
            height={contentHeight}
            sx={{ minHeight: contentHeight }}
        />
        <CardActions sx={{ minHeight: actionsHeight }}>
            <Box sx={{ ml: 1 }}>
                <Typography variant="body1">{introAuthorText}</Typography>
            </Box>
            <Link href="https://gregmurray.org" passHref>
                <Button sx={{ ml: 'auto' }}>About</Button>
            </Link>
        </CardActions>
    </Card>
);

export default AuthorCard;
