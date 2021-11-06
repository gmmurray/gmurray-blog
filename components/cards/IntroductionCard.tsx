import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Link as MUILink,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { FC } from 'react';

import { CardComponentProps } from '../../lib/types';
import { ICategory } from '../../lib/sanityTypes';
import Link from 'next/link';
import { getCategoryHref } from '../../lib/routeHelpers';
import { introStaticContent } from '../../lib/staticContent';
import { urlForImage } from '../../lib/sanity';

const CATEGORIES_PER_LIST = 3;

type IntroductionCardProps = {
    categories: ICategory[];
} & CardComponentProps;

const IntroductionCard: FC<IntroductionCardProps> = ({
    cardHeight,
    contentHeight,
    actionsHeight,
    elevation,
    categories,
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const numLists = Math.ceil(categories.length / CATEGORIES_PER_LIST);
    const listsOfCategories: ICategory[][] = numLists > 1 ? [[], []] : [[]];
    categories.forEach((c, i) => {
        if (i > CATEGORIES_PER_LIST - 1) listsOfCategories[1].push(c);
        else listsOfCategories[0].push(c);
    });

    return (
        <Card
            elevation={elevation}
            sx={{
                minHeight: cardHeight,
            }}
        >
            <CardContent
                sx={{ minHeight: contentHeight, maxHeight: contentHeight }}
                component={Grid}
                container
            >
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {introStaticContent.welcomeText}
                    </Typography>
                </Grid>
                {categories.length > 0 && (
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="h5">Categories</Typography>
                        </Box>
                        <Box>
                            {categories.map(c => (
                                <Grid key={c._id} container>
                                    <Grid item>
                                        <Link
                                            href={getCategoryHref(c)}
                                            passHref
                                        >
                                            <MUILink color="primary">
                                                {c.title}
                                            </MUILink>
                                        </Link>
                                    </Grid>
                                    <Grid item sx={{ ml: 'auto' }}>
                                        {c.postCount} post(s)
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>
                    </Grid>
                )}
            </CardContent>
            <CardActions sx={{ minHeight: actionsHeight }}></CardActions>
        </Card>
    );
};

export default IntroductionCard;
