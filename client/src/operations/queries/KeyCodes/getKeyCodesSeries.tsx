import { useQuery, gql } from '@apollo/client';
import { KeyCodeSeries } from '@app/graphql/types';

interface KeyCodeSeriesResponse {
    keyCodeSeries: KeyCodeSeries[];
}

export const KEYCODE_SERIES = gql`
    {
        keyCodeSeries {
            createdAt
            series
            target
            count
        }
    }
`;

export function useKeyCodeSeries() {
    const { data } = useQuery<KeyCodeSeriesResponse>(KEYCODE_SERIES);

    return {
        keyCodeSeries: data?.keyCodeSeries,
    };
}
