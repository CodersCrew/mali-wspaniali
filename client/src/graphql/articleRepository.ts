import { gql } from '@apollo/client';

export const ARTICLES_BY_CATEGORY = gql`
    query Articles($page: Float!, $category: String!) {
        articles(page: $page, category: $category) {
            _id
            title
            description
            category
            pictureUrl
        }
    }
`;

export const ARTICLES = gql`
    query Articles($page: Float!) {
        articles(page: $page) {
            _id
            title
            description
            category
            pictureUrl
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
