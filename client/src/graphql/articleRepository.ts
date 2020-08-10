import { gql, DocumentNode, ApolloQueryResult } from '@apollo/client';

import { Article } from './types';
import { client } from '../apollo_client';

export function getArticles(page: number, category?: string): Promise<ApolloQueryResult<{ articles: Article[] }>> {
    let query: DocumentNode;

    if (category) {
        query = gql`
        {
            articles(page: ${page}, category: "${category}") {
                _id
                title
                description
                category
                pictureUrl
            }
        }
    `;
    } else {
        query = gql`
        {
            articles(page: ${page}) {
                _id
                title
                description
                category
                pictureUrl
            }
        }
    `;
    }

    return client.query({ query });
}

export function getLastArticles(count: number): Promise<ApolloQueryResult<{ lastArticles: Article[] }>> {
    return client.query({
        query: gql`
    {
        lastArticles(count: ${count}) {
            _id
            title
            description
            category
            pictureUrl
        }
    }
`,
    });
}

export function getArticleDocById(articleId: string): Promise<ApolloQueryResult<{ article: Article }>> {
    return client.query({
        query: gql`
            {
                article(id: "${articleId}") {
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
        `,
    });
}
