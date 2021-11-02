// @ts-ignore

import BlockContent from '@sanity/block-content-to-react';
import CodeSerializer from './CodeSerializer';

const serializers = {
    types: {
        code: (props: any) => <CodeSerializer {...props} />,
    },
};

const PortableText = (props: any) => (
    <BlockContent serializers={serializers} blocks={props.blocks} />
);

export default PortableText;
