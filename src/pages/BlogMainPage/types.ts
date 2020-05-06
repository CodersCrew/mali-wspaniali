import { Snapshot } from '../../firebase/types';

export type Article = {
    pictureUrl: string;
    title: string;
    category: string[];
    description: string;
    // date: Date;
}

export type ArticleState = {
    categoryKey: string | undefined,
    startAfter: Snapshot,
    endBefore: Snapshot
}