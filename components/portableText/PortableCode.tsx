import { PortableTextReactComponents } from '@portabletext/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const PortableCode: PortableTextReactComponents['types']['code'] = ({
    value: { language, code } = {},
}) => {
    if (!code) return null;
    return (
        <SyntaxHighlighter
            language={language}
            style={atomOneDarkReasonable}
            showLineNumbers
        >
            {code}
        </SyntaxHighlighter>
    );
};

export default PortableCode;
