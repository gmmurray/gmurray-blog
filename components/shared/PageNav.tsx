import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IPost } from '../../lib/sanityTypes';
import Link from 'next/link';
import React from 'react';

type Props = {
    post?: IPost;
};

const PageNav = ({ post }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', mb: 1 }}>
            <Link href="/" passHref>
                <Button variant="text" color="primary">
                    Home
                </Button>
            </Link>
            {post && (
                <Link href={`/${post.category.slug.current}`} passHref>
                    <Button variant="text" color="primary" sx={{ ml: 'auto' }}>
                        More {post.category.title}
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default PageNav;
