import { Box, Typography } from '@mui/material';

import { PortableTextReactComponents } from '@portabletext/react';
import React from 'react';

const PortableCodeInline: PortableTextReactComponents['marks']['code'] = ({
    children,
}) => {
    return (
        <Box
            component="code"
            sx={{
                backgroundColor: theme => theme.palette.background.default,
                borderRadius: '5px',
                px: 0.5,
            }}
        >
            {children}
        </Box>
    );
};

export default PortableCodeInline;
