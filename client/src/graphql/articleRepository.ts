import { gql, FetchResult } from '@apollo/client';

import { client } from '../apollo_client';
import { ReturnedStatus, ArticleInput } from './types';

export function createArticle(article: ArticleInput): Promise<FetchResult<ReturnedStatus>> {
    return client.mutate({
        mutation: gql`
            mutation createArticle($article: ArticleInput!) {
                createArticle(article: $article) {
                    status
                }
            }
        `,
        variables: { article },
    });
}

export const ARTICLES_BY_CATEGORY = gql`
    query Articles($page: Int!, $perPage: Int!, $category: String!) {
        paginatedArticles(page: $page, perPage: $perPage, category: $category) {
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
`;

export const ARTICLES = gql`
    query Articles($page: Int!, $perPage: Int!) {
        paginatedArticles(page: $page, perPage: $perPage) {
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
`;
