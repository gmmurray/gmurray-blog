import { Link } from '@mui/material';
import { PortableTextReactComponents } from '@portabletext/react';

const PortableLink: PortableTextReactComponents['marks']['link'] = ({
    children,
    value,
}: any) => {
    return (
        <Link
            sx={{ cursor: 'pointer' }}
            href={value.href}
            target="_blank"
            rel="noopener"
        >
            {children}
        </Link>
    );
};

export default PortableLink;
