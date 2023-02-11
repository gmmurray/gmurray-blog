import Link from 'next/link';
import { Link as MUILink } from '@mui/material';
import { PortableTextReactComponents } from '@portabletext/react';

const PortableNextLink: PortableTextReactComponents['marks']['nextLink'] = ({
    children,
    value: { postSlug, categorySlug },
}: any) => {
    return (
        <Link href={`/${categorySlug}/${postSlug}`} passHref>
            <MUILink sx={{ cursor: 'pointer' }}>{children}</MUILink>
        </Link>
    );
};

export default PortableNextLink;
