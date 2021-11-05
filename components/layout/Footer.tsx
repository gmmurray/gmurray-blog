import {
    AppBar,
    Button,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import Link from 'next/link';
import ScrollTopButton from './ScrollTopButton';

const Footer = () => {
    const theme = useTheme();
    const isXlScreen = useMediaQuery(theme.breakpoints.up('xl'));
    return (
        <AppBar
            color="primary"
            position="sticky"
            component={Grid}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100px' }}
        >
            <Grid item />
            {!isXlScreen && (
                <Grid item>
                    <ScrollTopButton type="footer" />
                </Grid>
            )}
            <Grid item>
                <Link href="/" passHref>
                    <Button color="inherit">home</Button>
                </Link>
            </Grid>
            <Grid item>
                <Typography variant="caption">
                    Copyright&#169; Greg Murray {new Date().getFullYear()}
                </Typography>
            </Grid>
            <Grid item />
        </AppBar>
    );
};

export default Footer;
