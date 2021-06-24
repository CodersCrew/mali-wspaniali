import { ArticleInput } from '../../graphql/types';

export type ArticleState = {
    isPreview: boolean;
    article: ArticleInput;
    isValid?: boolean;
};

export type ArticleCategoryOptions = {
    value: string;
    label: string;
};
