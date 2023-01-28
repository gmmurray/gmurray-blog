import { Chip, Stack } from '@mui/material';

import { FC } from 'react';
import { ITag } from '../../lib/sanityTypes';

type PostTagsProps = {
    tags?: ITag[];
};

const PostTags: FC<PostTagsProps> = ({ tags }) => {
    if (!tags || tags.length === 0) return null;
    return (
        <Stack direction="row" spacing={1} sx={{ overflow: 'auto', pb: 2 }}>
            {tags.map(t => (
                <Chip
                    key={t.value}
                    label={t.label}
                    color="primary"
                    variant="outlined"
                />
            ))}
        </Stack>
    );
};

export default PostTags;
