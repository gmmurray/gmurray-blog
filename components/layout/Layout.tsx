import { FC, Fragment } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import Footer from './Footer';
import ScrollTopButton from './ScrollTopButton';

const Layout: FC = ({ children }) => {
    const theme = useTheme();
    const isXlScreen = useMediaQuery(theme.breakpoints.up('xl'));
    return (
        <Fragment>
            <span id="topOfPage" />
            {children}
            {isXlScreen && <ScrollTopButton type="floating" />}
            <Footer />
        </Fragment>
    );
};

export default Layout;
