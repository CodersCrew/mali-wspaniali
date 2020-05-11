import { Snapshot } from '../../firebase/types';

export type Article = {
    pictureUrl: string;
    title: string;
    category: string[];
    description: string;
}

export type ArticleState = {
    categoryKey: string | undefined,
    startAfter: Snapshot,
    endBefore: Snapshot
}

export type BlogArticleCardProps = {
    image: string,
    title: string,
    description: string,
    link: string,
    category: ArticleCategories
}

export type ArticleCategories = 'all' | 'food' | 'activity' | 'emotions' | 'other'