import { gql, useQuery } from '@apollo/client';

import { KindergartenWithChildren } from '../../../graphql/types';

export interface KindergartenListResponse {
    assessment: {
        kindergartens: KindergartenWithChildren[];
    };
}

interface UseKindergartensReturnType {
    kindergartenList: KindergartenWithChildren[];
    isKindergartenListLoading: boolean;
}

export const KINDERGARTENS_WITH_CHILDREN = gql`
    query Assessment($assessmentId: String!, $page: Int, $searchPhrase: String) {
        assessment(id: $assessmentId) {
            kindergartens(page: $page, searchPhrase: $searchPhrase) {
                kindergarten {
                    _id
                    name
                    number
                    address
                    city
                    firstMeasurementResultCount
                    lastMeasurementResultCount
                    maxResultCount
                    children {
                        _id
                        firstname
                        lastname
                        age
                        birthYear
                        birthQuarter
                    }
                }
            }
        }
    }
`;

export function useKindergartensWithChildren(
    assessmentId: string,
    page: number,
    searchPhrase: string,
): UseKindergartensReturnType {
    const { data, loading } = useQuery<KindergartenListResponse>(KINDERGARTENS_WITH_CHILDREN, {
        variables: { assessmentId, page, searchPhrase },
    });

    return {
        kindergartenList: data?.assessment.kindergartens || [],
        isKindergartenListLoading: loading,
    };
}
