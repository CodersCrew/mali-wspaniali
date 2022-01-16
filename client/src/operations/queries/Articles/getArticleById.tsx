import { gql, useQuery } from '@apollo/client';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { Article } from '@app/graphql/types';

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
    const { data, error } = useQuery<{ article: Article }>(ARTICLE_BY_ID, {
        variables: { articleId: id },
    });

    if (error) {
        openSnackbar({ text: error.message, severity: 'error' });
    }

    return { article: data?.article };
}
