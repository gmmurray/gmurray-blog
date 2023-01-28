import PortableBlockquote from '../portableText/PortableBlockquote';
import PortableCodeBlock from '../portableText/PortableCodeBlock';
import PortableCodeInline from '../portableText/PortableCodeInline';
import PortableLink from '../portableText/PortableLink';
import { PortableTextReactComponents } from '@portabletext/react';

export const portableTextComponents: Partial<PortableTextReactComponents> = {
    types: {
        code: PortableCodeBlock,
    },
    marks: {
        link: PortableLink,
        code: PortableCodeInline,
    },
    block: {
        blockquote: PortableBlockquote,
    },
};
