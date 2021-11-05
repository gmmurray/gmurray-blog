import { Button, Fab, Slide, useScrollTrigger } from '@mui/material';
import React, { FC, useCallback } from 'react';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/system';

type ScrollTopButtonProps = {
    type: 'floating' | 'footer';
};

type BaseScrollTopButtonProps = {
    scrollTrigger: boolean;
    handleClick: (event: any) => void;
};

const FloatingScrollTopButton: FC<BaseScrollTopButtonProps> = ({
    scrollTrigger,
    handleClick,
}) => (
    <Slide in={scrollTrigger} direction="up">
        <Box
            onClick={handleClick}
            role="presentation"
            sx={{
                position: 'fixed',
                bottom: 116,
                right: 16,
            }}
        >
            <Fab variant="extended" color="primary">
                <ArrowUpwardIcon sx={{ mr: 1 }} />
                back to top
            </Fab>
        </Box>
    </Slide>
);

const FooterScrollTopButton: FC<BaseScrollTopButtonProps> = ({
    handleClick,
}) => (
    <Button color="inherit" onClick={handleClick} sx={{ p: 0 }}>
        back to top
    </Button>
);

const ScrollTopButton: FC<ScrollTopButtonProps> = ({ type }) => {
    const scrollTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 300,
    });

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            const anchor = (
                (event.target as HTMLDivElement).ownerDocument || document
            ).querySelector('#topOfPage');

            if (anchor) {
                anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
        [],
    );
    const buttonProps = {
        handleClick,
        scrollTrigger,
    };
    return type === 'floating' ? (
        <FloatingScrollTopButton {...buttonProps} />
    ) : (
        <FooterScrollTopButton {...buttonProps} />
    );
};

export default ScrollTopButton;
