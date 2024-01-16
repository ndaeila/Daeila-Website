import React, { ReactNode } from 'react';
import LeftArticlePanel from './ArticlePanel/LeftPanel';
import RightArticlePanel from './ArticlePanel/RightPanel';

type Article3PanelProps = {
    titleheader: ReactNode;
    content: ReactNode;
}

const Article3Panel = ({titleheader, content}: Article3PanelProps) => {
    return (
        <div>
            <div>

            </div>
            <div className="pt-5 flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-5">
                <LeftArticlePanel articleContent={content}/>
                <main>{content}</main>
                <RightArticlePanel/>
            </div>
        </div>
    );
}

export default Article3Panel;