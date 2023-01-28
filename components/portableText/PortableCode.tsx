import { PortableTextReactComponents } from '@portabletext/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const PortableCode: PortableTextReactComponents['types']['code'] = ({
    value: { language, code } = {},
}) => {
    if (!code) return null;
    return (
        <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
            {code}
        </SyntaxHighlighter>
    );
};

export default PortableCode;
