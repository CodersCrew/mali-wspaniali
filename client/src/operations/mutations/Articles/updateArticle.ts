import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { Article } from '../../../graphql/types';

export interface UpdateArticleInput {
    title: string;
    category: string;
    contentHTML: string;
    description: string;
    pictureUrl: string;
    redactor: {
        firstName: string;
        lastName: string;
    };
}

interface UpdateArticleResponse {
    createArticle: Article;
}

const UPDATE_ARTICLE = gql`
    mutation updateArticle($updates: UpdateArticleInput!) {
        updateArticle(updates: $updates) {
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

export function useUpdateArticle() {
    const [mutate] = useMutation<UpdateArticleResponse>(UPDATE_ARTICLE);
    const { t } = useTranslation();

    return {
        updateArticle: ({
            __typename,
            deletedAt,
            createdAt,
            publishedAt,
            modifiedAt,
            ...article
        }: Record<string, any>) => {
            const {
                redactor: { __typename: trash, ...redactorRest },
            } = article;

            return mutate({
                variables: { updates: { ...article, redactor: redactorRest } },
            }).then(() => {
                openSnackbar({ text: t('add-article.events.updated') });
            });
        },
    };
}
