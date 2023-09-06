import { Box, Popover, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { toHyphenatedString } from '../../lib/stringHelpers';
import { useRouter } from 'next/router';

const PortableH2 = ({ children }: any) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(
        undefined,
    );

    const content = children[0];
    const hyphenated = toHyphenatedString(content);
    const link = router.asPath.split('#')[0] + '#' + hyphenated;

    const handleHeaderClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (typeof window === 'undefined') {
                return;
            }
            const fullUrl = window.location.origin + link;
            window.navigator.clipboard.writeText(fullUrl);
            setAnchorEl(event.currentTarget);
            setTimeout(() => setAnchorEl(undefined), 3000);
        },
        [link],
    );

    if (!children || !Array.isArray(children) || children.length > 1) {
        return <h2>{children}</h2>;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" id={hyphenated}>
                {content}
            </Typography>
            <IconButton onClick={handleHeaderClick}>
                <LinkIcon fontSize="small" />
            </IconButton>
            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(undefined)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>Link copied to clipboard!</Typography>
            </Popover>
        </Box>
    );
};

export default PortableH2;
