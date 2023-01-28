import { Box, Typography } from '@mui/material';

import { IconButton } from '@mui/material';
import Link from 'next/link';
import LinkIcon from '@mui/icons-material/Link';
import React from 'react';
import { toHyphenatedString } from '../../lib/stringHelpers';
import { useRouter } from 'next/router';

const PortableH2 = ({ children }: any) => {
    const router = useRouter();
    if (!children || !Array.isArray(children) || children.length > 1) {
        return <h2>{children}</h2>;
    }
    const content = children[0];
    const hyphenated = toHyphenatedString(content);
    const link = router.asPath.split('#')[0] + '#' + hyphenated;

    return (
        <Box sx={{ display: 'flex' }}>
            <Typography variant="h5" component="h2" id={hyphenated}>
                {content}
            </Typography>
            <Link href={link} passHref>
                <IconButton>
                    <LinkIcon fontSize="small" />
                </IconButton>
            </Link>
        </Box>
    );
};

export default PortableH2;
