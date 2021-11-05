import { Button, Card, CardActions } from '@mui/material';

import { CardComponentProps } from '../../lib/types';
import { FC } from 'react';

type PaginationCardProps = {
    onNext: () => any;
    canClickNext: boolean;
    onPrev: () => any;
    canClickPrev: boolean;
} & CardComponentProps;

const PaginationCard: FC<PaginationCardProps> = ({
    onNext,
    canClickNext,
    onPrev,
    canClickPrev,
    ...cardProps
}) => {
    return (
        <Card
            elevation={cardProps.elevation}
            sx={{ maxHeight: cardProps.actionsHeight }}
        >
            <CardActions sx={{ minHeight: cardProps.actionsHeight }}>
                <Button
                    onClick={onPrev}
                    disabled={!canClickPrev}
                    sx={{ mr: 'auto' }}
                >
                    Previous page
                </Button>
                <Button onClick={onNext} disabled={!canClickNext}>
                    Next page
                </Button>
            </CardActions>
        </Card>
    );
};

export default PaginationCard;
