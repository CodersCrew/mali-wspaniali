import { useQuery } from '@apollo/client';
import { PaginatedArticles } from '../../../graphql/types';
import { ARTICLES, ARTICLES_BY_CATEGORY } from '../../../graphql/articleRepository';

interface IParams {
    page: number;
    perPage: number;
    category: string;
}

export function useArticles({ page, perPage, category }: IParams) {
    const { data, loading, fetchMore } = useQuery<{
        paginatedArticles: PaginatedArticles;
    }>(category === 'all' ? ARTICLES : ARTICLES_BY_CATEGORY, {
        variables: {
            page,
            perPage,
            category,
        },
    });

    return { data, loading, fetchMore };
}
