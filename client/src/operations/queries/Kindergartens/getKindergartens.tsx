import { gql, useQuery } from '@apollo/client';
import { Kindergarten } from '../../../graphql/types';

interface KindergartenListResponse {
    kindergartens: Kindergarten[];
}

export const KINDERGARTENS = gql`
    {
        kindergartens {
            _id
            name
            number
            address
            city
        }
    }
`;

export function useKindergartens() {
    const { data, loading } = useQuery<KindergartenListResponse>(KINDERGARTENS);

    return {
        kindergartenList: data?.kindergartens,
        isKindergartenListLoading: loading
    };
}