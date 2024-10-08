import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';
import { Article } from '../../../graphql/types';
import { useArticles } from '../../queries/Articles/getArticles';

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
    const { refetch } = useArticles(1);
    const { t } = useTranslation();

    return {
        createArticle: () => {
            return mutate({
                variables: {
                    article: {
                        title: 'Nowy artykuł',
                        category: 'other',
                        contentHTML: '',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        pictureUrl: getRandomImage(),
                        redactor: {
                            firstName: '',
                            lastName: '',
                        },
                    },
                },
            }).then(async (result) => {
                openSnackbar({ text: t('add-article.events.created') });
                await refetch();

                return result.data?.createArticle?._id;
            });
        },
    };
}

function getRandomImage() {
    return `https://picsum.photos/id/${Math.floor(Math.random() * 1000) + 1}/1200/800`;
}
