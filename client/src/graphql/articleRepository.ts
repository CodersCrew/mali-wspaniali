import { gql } from '@apollo/client';

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
