import { firebase } from '../firebase/firebase';
import { Article, PaginatedArticleList, Snapshot } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const getArticleById = (articleId: string, onSnapshotCallback: OnSnapshotCallback<Article>) => {
    firebase.article.getArticleDocById(articleId, onSnapshotCallback);
};

export const getSimilarArticlesListData = async (
    article: Article,
    category: string[],
    tags: string[],
    onSnapshotCallback: OnSnapshotCallback<Article[]>,
) => {
    firebase.article.getSimilarArticlesListData(article, category, tags, onSnapshotCallback);
};

export const getArticles = (onSnapshotCallback: OnSnapshotCallback<PaginatedArticleList>, category?: string, startAfter?: Snapshot, endBefore?: Snapshot) => {
    firebase.article.getArticles(onSnapshotCallback, category, startAfter, endBefore);
};
 