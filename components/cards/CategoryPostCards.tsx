import { Grid, Grow } from '@mui/material';
import React, { FC, Fragment } from 'react';

import { CardComponentProps } from '../../lib/types';
import CardPlaceholder from './CardPlaceholder';
import { CategoryPostResponse } from '../../lib/queryHooks';
import { POST_TRANSITION_DURATION } from '../../lib/constants';
import PaginationCard from './PaginationCard';
import PostCard from './PostCard';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

type CategoryPostCardsProps = {
    isLoading: boolean;
    data: CategoryPostResponse | undefined;
    onNextPage: () => any;
    canClickNext: boolean;
    onPrevPage: () => any;
    canClickPrev: boolean;
    cardImageHeight: number;
} & CardComponentProps;

const CategoryPostCards: FC<CategoryPostCardsProps> = ({
    isLoading,
    data,
    onNextPage,
    canClickNext,
    onPrevPage,
    canClickPrev,
    cardImageHeight,
    ...cardProps
}) => {
    const renderContent = () => {
        if (isLoading)
            return (
                <Grid item xs={12}>
                    <CardPlaceholder
                        loading
                        message="Quality content incoming..."
                        {...cardProps}
                    />
                </Grid>
            );
        else if (!data || data.data.length === 0) {
            return (
                <Grid item xs={12}>
                    <CardPlaceholder
                        message="No posts found"
                        icon={
                            <SentimentVeryDissatisfiedIcon
                                sx={{ fontSize: 40 }}
                            />
                        }
                        {...cardProps}
                    />
                </Grid>
            );
        }
        return (
            <Fragment>
                {data.data.map(post => (
                    <Grow key={post._id} in timeout={POST_TRANSITION_DURATION}>
                        <Grid item xs={12}>
                            <PostCard
                                post={post}
                                imageHeight={cardImageHeight}
                                {...cardProps}
                            />
                        </Grid>
                    </Grow>
                ))}
            </Fragment>
        );
    };

    return (
        <Fragment>
            {renderContent()}
            <Grid item xs={12}>
                <PaginationCard
                    onNext={onNextPage}
                    onPrev={onPrevPage}
                    canClickNext={canClickNext}
                    canClickPrev={canClickPrev}
                    {...cardProps}
                />
            </Grid>
        </Fragment>
    );
};

export default CategoryPostCards;
