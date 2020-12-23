import { gql, useQuery } from '@apollo/client';

import { Kindergarten } from '../../../graphql/types';

export interface KindergartenListResponse {
    kindergartens: Kindergarten[];
};

interface UseKindergartensReturnType {
    kindergartenList: Kindergarten[];
    isKindergartenListLoading: boolean;
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

export function useKindergartens(): UseKindergartensReturnType {
    const { data, loading } = useQuery<KindergartenListResponse>(KINDERGARTENS);

    return {
        kindergartenList: data?.kindergartens || [],
        isKindergartenListLoading: loading
    };
}