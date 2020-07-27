import { gql, DocumentNode, ApolloQueryResult } from 'apollo-boost';

import { Article } from './types';
import { client } from '../apollo_client';

export function getPaginatedArticles(
    page: number,
    category?: string,
): Promise<ApolloQueryResult<{ paginatedArticles: { articles: Article[]; count: number; hasNext: boolean } }>> {
    let query: DocumentNode;

    if (category) {
        query = gql`
        {
            paginatedArticles(page: ${page}, category: "${category}") {
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
    } else {
        query = gql`
        {
            paginatedArticles(page: ${page}) {
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
