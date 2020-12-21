import { gql, useQuery } from '@apollo/client';
import { Assessment } from '../../../graphql/types';

interface AssessmentListResponse {
    assessments: Assessment[];
}

interface UseAssessmentsReturnType {
    assessmentList: Assessment[];
    isAssessmentListLoading: boolean;
}

export const ASSESSMENTS = gql`
    {
        assessments {
            _id
            isOutdated
            title
            startDate
            endDate
            kindergartens {
                kindergarten {
                    _id
                    name
                    number
                }
                instructor {
                    _id
                    mail
                }
            }
        }
    }
`;

export function useAssessments(): UseAssessmentsReturnType {
    const { data, loading } = useQuery<AssessmentListResponse>(ASSESSMENTS);

    return {
        assessmentList: data?.assessments || [],
        isAssessmentListLoading: loading,
    };
}
