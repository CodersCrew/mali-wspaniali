import { useQuery, gql } from '@apollo/client';
import { KeyCodeSeries } from '../../../graphql/types';

interface KeyCodeSeriesResponse {
    keyCodeSeries: KeyCodeSeries[];
}


export const KEYCODE_SERIES = gql`
    {
        keyCodeSeries {
            date
            series
            target
            count
        }
    }
`;


export function useKeyCodeSeries() {
    const { data } = useQuery<KeyCodeSeriesResponse>(KEYCODE_SERIES);

    return {
        keyCodeSeries: data?.keyCodeSeries
    }

}