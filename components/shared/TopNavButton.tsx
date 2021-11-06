import { Button, useMediaQuery, useTheme } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FC } from 'react';
import Link from 'next/link';

type TopNavButtonProps = {
    route: string;
    text: string;
};

const TopNavButton: FC<TopNavButtonProps> = ({ route, text }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Link href={route} passHref>
            <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: isSmallScreen ? 15 : 23,
                    paddingLeft: 0,
                }}
                color="primary"
            >
                {text}
            </Button>
        </Link>
    );
};

export default TopNavButton;
