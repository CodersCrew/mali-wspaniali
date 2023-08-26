import { useQuery, gql } from '@apollo/client';
import { KeyCodeSeries } from '@app/graphql/types';
import { useMemo } from 'react';

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

    const keyCodeSeries = useMemo(() => data?.keyCodeSeries, [data]);

    return {
        keyCodeSeries,
    };
}
