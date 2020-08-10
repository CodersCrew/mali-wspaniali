import { ApolloQueryResult } from '@apollo/client';

import { Article } from '../graphql/types';
import * as ArticleRepository from '../graphql/articleRepository';

export const getArticleById = (articleId: string): Promise<ApolloQueryResult<{ article: Article }>> => {
    return ArticleRepository.getArticleDocById(articleId);
};

export const getArticles = (page: number, category?: string): Promise<ApolloQueryResult<{ articles: Article[] }>> => {
    return ArticleRepository.getArticles(page, category);
};

export const getLastArticles = (count: number): Promise<ApolloQueryResult<{ lastArticles: Article[] }>> => {
    return ArticleRepository.getLastArticles(count);
};
