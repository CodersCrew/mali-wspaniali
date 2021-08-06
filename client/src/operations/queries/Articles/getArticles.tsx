import { gql, useQuery } from '@apollo/client';
import { PaginatedArticles } from '../../../graphql/types';

export const ARTICLES_PER_PAGE = 6;

export const ARTICLES_BY_CATEGORY = gql`
    query Articles($page: Int!, $perPage: Int!, $category: String!) {
        paginatedArticles(page: $page, perPage: $perPage, category: $category) {
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

export const ARTICLES = gql`
    query Articles($page: Int!, $perPage: Int!) {
        paginatedArticles(page: $page, perPage: $perPage) {
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
export function useArticles(currentPage: number, category = 'all') {
    const { data, loading, fetchMore, refetch } = useQuery<{
        paginatedArticles: PaginatedArticles;
    }>(category === 'all' ? ARTICLES : ARTICLES_BY_CATEGORY, {
        variables: {
            page: currentPage,
            perPage: ARTICLES_PER_PAGE,
            category: category === 'all' ? undefined : category,
        },
    });

    return { paginatedArticles: data?.paginatedArticles, loading, fetchMore, refetch };
}
