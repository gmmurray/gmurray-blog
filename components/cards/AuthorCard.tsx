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
import { IAboutContent } from '../../types/portfolioContent';
import Link from 'next/link';
import { introStaticContent } from '../../lib/staticContent';

type AuthorCardProps = {
    portfolioContent: IAboutContent;
} & CardComponentProps;

const AuthorCard: FC<AuthorCardProps> = ({
    cardHeight,
    contentHeight,
    actionsHeight,
    elevation,
    portfolioContent,
}) => (
    <Card
        elevation={elevation}
        sx={{
            minHeight: cardHeight,
        }}
    >
        <CardMedia
            component="img"
            src={portfolioContent.imageUrl}
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
                <Button variant="contained" sx={{ ml: 'auto' }}>
                    About
                </Button>
            </Link>
        </CardActions>
    </Card>
);

export default AuthorCard;
