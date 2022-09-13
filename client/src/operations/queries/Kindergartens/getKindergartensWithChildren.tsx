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
    query Assessment($assessmentId: String!, $page: Int) {
        assessment(id: $assessmentId) {
            kindergartens(page: $page) {
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

export function useKindergartensWithChildren(assessmentId: string, page: number): UseKindergartensReturnType {
    const { data, loading } = useQuery<KindergartenListResponse>(KINDERGARTENS_WITH_CHILDREN, {
        variables: { assessmentId, page },
    });

    return {
        kindergartenList: data?.assessment.kindergartens || [],
        isKindergartenListLoading: loading,
    };
}
