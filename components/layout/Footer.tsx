import { AppBar, Grid, useMediaQuery, useTheme } from '@mui/material';

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
            sx={{ height: '80px' }}
        >
            <Grid item />
            {!isXlScreen && (
                <Grid item>
                    <ScrollTopButton type="footer" />
                </Grid>
            )}
            <Grid item>
                Copyright&#169; Greg Murray {new Date().getFullYear()}
            </Grid>
            <Grid item />
        </AppBar>
    );
};

export default Footer;
