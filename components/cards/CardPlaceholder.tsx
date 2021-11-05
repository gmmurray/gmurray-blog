import { Card, CircularProgress, Grid, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

import { CardComponentProps } from '../../lib/types';

type CardPlaceholderProps = {
    loading?: boolean;
    message?: string;
    icon?: ReactNode;
} & CardComponentProps;

const CardPlaceholder: FC<CardPlaceholderProps> = ({
    message,
    icon,
    loading = false,
    ...cardProps
}) => (
    <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        component={Card}
        elevation={cardProps.elevation}
        sx={{ minHeight: cardProps.cardHeight }}
    >
        {!!icon && icon}
        {loading && (
            <Grid item>
                <CircularProgress />
            </Grid>
        )}
        {!!message && (
            <Grid item>
                <Typography>{message}</Typography>
            </Grid>
        )}
    </Grid>
);

export default CardPlaceholder;
