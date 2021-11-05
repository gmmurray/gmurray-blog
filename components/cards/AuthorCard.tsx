import {
    Button,
    Card,
    CardActions,
    CardMedia,
    Typography,
} from '@mui/material';

import { Box } from '@mui/system';
import { CardComponentProps } from '../../lib/types';
import { FC } from 'react';
import Link from 'next/link';
import { introStaticContent } from '../../lib/staticContent';

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
            src={introStaticContent.authorImage}
            alt={`${introStaticContent.authorText} image`}
            height={contentHeight}
            sx={{ minHeight: contentHeight }}
        />
        <CardActions sx={{ minHeight: actionsHeight }}>
            <Box sx={{ ml: 1 }}>
                <Typography variant="body1">
                    {introStaticContent.authorText}
                </Typography>
            </Box>
            <Link href={introStaticContent.webUrl} passHref>
                <Button sx={{ ml: 'auto' }}>About</Button>
            </Link>
        </CardActions>
    </Card>
);

export default AuthorCard;
