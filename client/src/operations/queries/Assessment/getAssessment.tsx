import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Assessment } from '../../../graphql/types';

export interface AssessmentResponse {
    assessment: Assessment;
}

interface UseAssessmentReturn {
    assessment: Assessment | undefined;
    isAssessmentLoading: boolean;
}

export const GET_ASSESSMENT = gql`
    query Assessment($id: String!) {
        assessment(id: $id) {
            _id
            isOutdated
            isDeleted
            title
            startDate
            endDate
            kindergartens {
                kindergarten {
                    _id
                    name
                }
                instructor {
                    _id
                }
            }
        }
    }
`;

export function useAssessment(id: string | undefined): UseAssessmentReturn {
    const [getTest, { data, loading }] = useLazyQuery<AssessmentResponse>(GET_ASSESSMENT);

    useEffect(() => {
        if (id) {
            getTest({ variables: { id } });
        }
    }, [id, getTest]);

    return {
        assessment: data?.assessment,
        isAssessmentLoading: loading,
    };
}
