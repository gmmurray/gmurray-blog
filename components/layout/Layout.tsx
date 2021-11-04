import { FC, Fragment } from 'react';

import ScrollTopButton from './ScrollTopButton';

const Layout: FC = ({ children }) => {
    return (
        <Fragment>
            <span id="topOfPage" />
            {children}
            <ScrollTopButton />
        </Fragment>
    );
};

export default Layout;
