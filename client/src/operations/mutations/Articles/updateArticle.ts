import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { Article } from '@app/graphql/types';

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
    const [mutate, { loading }] = useMutation<UpdateArticleResponse>(UPDATE_ARTICLE);
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
            const { redactor } = article;
            const updates = article;

            if (redactor) {
                const { __typename: trash, ...redactorRest } = redactor;
                updates.redactor = redactorRest;
            }

            return mutate({
                variables: { updates },
            })
                .then(() => {
                    openSnackbar({ text: t('add-article.events.updated') });
                })
                .catch((e) => {
                    if (e.message.includes('title')) {
                        return openSnackbar({ text: t('add-article.events.updated-wrong-title'), severity: 'error' });
                    }

                    if (e.message.includes('description')) {
                        return openSnackbar({
                            text: t('add-article.events.updated-wrong-description'),
                            severity: 'error',
                        });
                    }

                    openSnackbar({ text: t('add-article.events.updated-unknown-error'), severity: 'error' });
                });
        },
        isUpdatePending: loading,
    };
}
