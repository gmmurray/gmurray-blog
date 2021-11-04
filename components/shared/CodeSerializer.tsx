import { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

type CodeSerializerProps = {
    node?: {
        language?: string;
        code?: string;
    };
};

const CodeSerializer: FC<CodeSerializerProps> = ({
    node: { language, code } = {},
}) => {
    if (!code) return null;
    return (
        <SyntaxHighlighter
            language={language}
            style={atomOneDark}
            showLineNumbers
        >
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeSerializer;
