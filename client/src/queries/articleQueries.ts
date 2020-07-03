import { ApolloQueryResult } from 'apollo-boost';

import { Article } from '../firebase/types';
import * as ArticleRepository from '../graphql/articleRepository';

export const getArticleById = (articleId: string): Promise<ApolloQueryResult<{ article: Article }>> => {
    return ArticleRepository.getArticleDocById(articleId);
};

export const getArticles = (page: number, category?: string): Promise<ApolloQueryResult<{ articles: Article[] }>> => {
    return ArticleRepository.getArticles(page, category);
};
