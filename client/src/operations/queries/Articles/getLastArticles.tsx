import { gql, useQuery } from '@apollo/client';
import { Article } from '@app/graphql/types';

const LAST_ARTICLES = gql`
    query Articles($count: Int!) {
        lastArticles(count: $count) {
            _id
            title
            description
            category
            pictureUrl
        }
    }
`;

export function useLastArticles(count: number) {
    const { data } = useQuery<{ lastArticles: Article[] }>(LAST_ARTICLES, { variables: { count } });

    return { articles: data?.lastArticles || [] };
}
