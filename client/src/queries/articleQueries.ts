import { ApolloQueryResult } from '@apollo/client';

import { Article } from '../graphql/types';
import * as ArticleRepository from '../graphql/articleRepository';

export const getArticles = (page: number, category?: string): Promise<ApolloQueryResult<{ articles: Article[] }>> => {
    return ArticleRepository.getArticles(page, category);
};
