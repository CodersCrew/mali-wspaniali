import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { Article } from '../../../graphql/types';

export interface CreatedArticleInput {
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

interface CreateArticleResponse {
    createArticle: Article;
}

const CREATE_ARTICLE = gql`
    mutation createArticle($article: CreateArticleInput!) {
        createArticle(article: $article) {
            _id
        }
    }
`;

export function useCreateArticle() {
    const [mutate] = useMutation<CreateArticleResponse>(CREATE_ARTICLE);
    const { t } = useTranslation();

    return {
        createArticle: () => {
            return mutate({
                variables: {
                    article: {
                        title: 'Artykuł',
                        category: 'other',
                        contentHTML: '',
                        description: '',
                        pictureUrl: getRandomImage(),
                        redactor: {
                            firstName: '',
                            lastName: '',
                        },
                    },
                },
            }).then((result) => {
                openSnackbar({ text: t('add-article.events.created') });

                return result.data?.createArticle?._id;
            });
        },
    };
}

function getRandomImage() {
    return `https://picsum.photos/id/${Math.floor(Math.random() * 1000) + 1}/1200/800`;
}
