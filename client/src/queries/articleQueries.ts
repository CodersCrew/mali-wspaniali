import { ApolloQueryResult } from 'apollo-boost';

import { firebase } from '../firebase/firebase';
import { Article } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';
import * as ArticleRepository from '../firebase/articleRepository';

export const getArticleById = (articleId: string): Promise<ApolloQueryResult<{ article: Article }>> => {
    return ArticleRepository.getArticleDocById(articleId);
};

export const getSimilarArticlesListData = async (
    article: Article,
    category: string[],
    tags: string[],
    onSnapshotCallback: OnSnapshotCallback<Article[]>,
) => {
    firebase.article.getSimilarArticlesListData(article, category, tags, onSnapshotCallback);
};

export const getArticles = (page: number, category?: string): Promise<ApolloQueryResult<{ articles: Article[] }>> => {
    return ArticleRepository.getArticles(page, category);
};

export const getArticlesListData = async (onSnapshotCallback: OnSnapshotCallback<Article[]>) => {
    firebase.article.getArticlesListData(onSnapshotCallback);
};
