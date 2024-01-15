import React, { ReactNode } from 'react';

type LeftArticlePanelProps = {
    articleContent: ReactNode;
};

const LeftArticlePanel = ({ articleContent }: LeftArticlePanelProps) => {
    // Filter out paragraph elements
    const filteredContent = React.Children.toArray(articleContent).filter(child => 
        React.isValidElement(child) && 
        typeof child.type === 'string' && 
        !child.type.match(/^p$/i)
    );

    // Function to determine the indentation level
    const getIndentation = (headerType: string) => {
        // Extract the numerical part of the header type (e.g., '1' from 'h1')
        const level = parseInt(headerType.replace('h', ''), 10);
        console.log(level);
        // Calculate the indentation based on the header level
        return `${(level - 1) / 2}em`; // 2em per indentation level
    };

    // Transform headers in filteredContent to paragraphs with indentation
    const transformedContent = filteredContent.map(child => {
        if (React.isValidElement(child) && typeof child.type === 'string') {
            if (child.type.match(/h[1-6]/i)) {
                const indentStyle = { textIndent: getIndentation(child.type) };
                return <p style={indentStyle}>{child.props.children}</p>;
            }
        }
        return child;
    });

    // Return the transformed content
    return (
        <div className="table-of-contents">
            {transformedContent}
        </div>
    );
};

export default LeftArticlePanel;
