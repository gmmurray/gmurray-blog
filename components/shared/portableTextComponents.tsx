import PortableBlockquote from '../portableText/PortableBlockquote';
import PortableCodeBlock from '../portableText/PortableCodeBlock';
import PortableCodeInline from '../portableText/PortableCodeInline';
import PortableH2 from '../portableText/PortableH2';
import PortableImage from '../portableText/PortableImage';
import PortableLink from '../portableText/PortableLink';
import { PortableTextReactComponents } from '@portabletext/react';

export const portableTextComponents: Partial<PortableTextReactComponents> = {
    types: {
        code: PortableCodeBlock,
        image: PortableImage,
    },
    marks: {
        link: PortableLink,
        code: PortableCodeInline,
    },
    block: {
        blockquote: PortableBlockquote,
        h2: PortableH2,
    },
};
