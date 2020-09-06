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

export const LAST_ARTICLES = gql`
    query Articles($count: Int!) {
        lastArticles(count: $count) {
            _id
            title
            description
            category
            pictureUrl
        }
    }
`;

export const ARTICLE_BY_ID = gql`
    query Article($articleId: String!) {
        article(id: $articleId) {
            _id
            title
            description
            subtitle
            header
            category
            pictureUrl
            readingTime
            contentHTML
            videoUrl
            tags
            redactor {
                avatarUrl
                firstName
                lastName
                profession
                biography
            }
        }
    }
`;
