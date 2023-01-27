import { Typography } from '@mui/material';

export const PortableBlockquote = ({ children }: any) => (
    <Typography
        variant="body1"
        sx={{
            margin: 0,
            borderLeft: '2px solid white',
            pl: '3rem',
            fontStyle: 'italic',
        }}
    >
        {children}
    </Typography>
);

export default PortableBlockquote;
