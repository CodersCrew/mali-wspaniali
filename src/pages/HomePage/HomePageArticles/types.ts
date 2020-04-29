import { ReactElement } from 'react';

export interface ArticleProps {
    articleId: string;
    title: string;
    description: string;
    ArticlePictureComponent: ReactElement;
}
