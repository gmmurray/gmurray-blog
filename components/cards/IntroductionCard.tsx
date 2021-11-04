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
    Typography,
    useMediaQuery,
} from '@mui/material';
import React, { FC } from 'react';

import { CardComponentProps } from '../../lib/types';
import { ICategory } from '../../lib/sanityTypes';
import Link from 'next/link';
import { getCategoryHref } from '../../lib/routeHelpers';
import { introText } from '../../lib/staticContent';
import { urlForImage } from '../../lib/sanity';
import { useTheme } from '@mui/system';

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
                    <Typography variant="body1">{introText}</Typography>
                </Grid>
                {categories.length > 0 && (
                    <Grid item xs={12}>
                        <Typography variant="h5">Categories</Typography>
                        <Grid container>
                            {listsOfCategories.map((cats, i) => (
                                <Grid key={i} item xs={6} alignItems="center">
                                    <List
                                        dense
                                        sx={{
                                            pt: isSmallScreen ? 0 : undefined,
                                        }}
                                    >
                                        {cats.map((c, index) => (
                                            <Link
                                                href={getCategoryHref(c)}
                                                passHref
                                                key={c._id}
                                            >
                                                <ListItemButton>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            // @ts-ignore
                                                            src={
                                                                c.image
                                                                    ? urlForImage(
                                                                          c.image,
                                                                      )
                                                                    : undefined
                                                            }
                                                        >
                                                            {c.image
                                                                ? null
                                                                : c.title[0]}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={c.title}
                                                        secondary={`${c.postCount} post(s)`}
                                                    />
                                                </ListItemButton>
                                            </Link>
                                        ))}
                                    </List>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </CardContent>
            <CardActions sx={{ minHeight: actionsHeight }}></CardActions>
        </Card>
    );
};

export default IntroductionCard;
