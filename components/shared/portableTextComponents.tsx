import PortableBlockquote from '../portableText/PortableBlockquote';
import PortableCode from '../portableText/PortableCode';
import PortableLink from '../portableText/PortableLink';

export const portableTextComponents = {
    types: {
        code: PortableCode,
    },
    marks: {
        link: PortableLink,
    },
    block: {
        blockquote: PortableBlockquote,
    },
};
