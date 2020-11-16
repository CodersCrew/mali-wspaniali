import { gql, useQuery } from '@apollo/client';
import { Assessment } from '../../../graphql/types';

interface TestListResponse {
    assessments: Assessment[];
}

export const ASSESSMENTS = gql`
    {
        assessments {
            _id
            isOutdated
            title
            startDate
            endDate
        }
    }
`;

export function useAssessments() {
    const { data, loading } = useQuery<TestListResponse>(ASSESSMENTS);

    return {
        assessmentList: data?.assessments || [],
        isAssessmentListLoading: loading
    };
}