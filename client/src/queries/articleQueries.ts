import { ApolloQueryResult, gql } from 'apollo-boost';

import { Article } from '../graphql/types';
import * as ArticleRepository from '../graphql/articleRepository';
import { useQuery } from '@apollo/react-hooks';

export const getArticleById = (articleId: string): Promise<ApolloQueryResult<{ article: Article }>> => {
    return ArticleRepository.getArticleDocById(articleId);
};

export const getBlogPage = (
    page: number,
    category?: string,
): Promise<ApolloQueryResult<{ paginatedArticles: { articles: Article[]; count: number; hasNext: boolean } }>> => {
    return ArticleRepository.getPaginatedArticles(page, category);
};

export const getLastArticles = (count: number): Promise<ApolloQueryResult<{ lastArticles: Article[] }>> => {
    return ArticleRepository.getLastArticles(count);
};

export const useBlogPage = () => {
    return useQuery(
        gql`
            query Article($page: Float!) {
                paginatedArticles(page: $page) {
                    articles {
                        _id
                        title
                        description
                        category
                        pictureUrl
                    }
                    count
                    hasNext
                }
            }
        `,
        {
            variables: {
                page: 1,
            },
            fetchPolicy: 'network-only',
        },
    );
};
