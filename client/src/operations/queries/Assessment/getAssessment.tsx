import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Assessment } from '../../../graphql/types';

export interface AssessmentResponse {
    assessment: Assessment;
}

interface UseAssessmentReturn {
    assessment: Assessment | undefined;
    isAssessmentLoading: boolean;
    refetchAssessment: () => void;
}

export const GET_ASSESSMENT = gql`
    query Assessment($id: String!) {
        assessment(id: $id) {
            _id
            isOutdated
            isDeleted
            title
            firstMeasurementStatus
            lastMeasurementStatus
            kindergartens {
                kindergarten {
                    _id
                    name
                    address
                    city
                    number
                }
                instructor {
                    _id
                }
            }
            firstMeasurementStartDate
            firstMeasurementEndDate
            lastMeasurementStartDate
            lastMeasurementEndDate
            firstMeasurementResultCount
            lastMeasurementResultCount
            maxResultCount
            groups {
                kindergartenId
                group
            }
        }
    }
`;

export function useAssessment(id: string | undefined): UseAssessmentReturn {
    const [getTest, { data, loading, refetch }] = useLazyQuery<AssessmentResponse>(GET_ASSESSMENT);

    useEffect(() => {
        if (id) {
            getTest({ variables: { id } });
        }
    }, [id, getTest]);

    return {
        assessment: data?.assessment,
        isAssessmentLoading: loading,
        refetchAssessment: () => {
            if (!refetch) return;

            refetch({ variables: { id } });
        },
    };
}
