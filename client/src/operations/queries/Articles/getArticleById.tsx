import { gql, useQuery } from '@apollo/client';
import { Article } from '../../../graphql/types';

const ARTICLE_BY_ID = gql`
    query Article($articleId: String!) {
        article(id: $articleId) {
            _id
            title
            description
            category
            pictureUrl
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
            isDeleted
            isPublished
            createdAt
            deletedAt
            modifiedAt
            publishedAt
        }
    }
`;

export function useArticleWithId(id: string) {
    const { data } = useQuery<{ article: Article }>(ARTICLE_BY_ID, {
        variables: { articleId: id },
    });

    return { article: data?.article };
}
