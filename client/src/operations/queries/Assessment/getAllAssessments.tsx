import { gql, useQuery } from '@apollo/client';
import { Assessment } from '../../../graphql/types';

export type BasicTest = Omit<Assessment, 'kindergartens'>;

interface TestListResponse {
    assessments: BasicTest[];
}

const GET_ALL_ASSESSMENTS = gql`
    {
        assessments {
            _id
            isOutdated
            isDeleted
            title
            startDate
            endDate
        }
    }
`;

export function useTests() {
    const { data, loading } = useQuery<TestListResponse>(GET_ALL_ASSESSMENTS);

    return {
        testList: data?.assessments || [],
        isTestListLoading: loading,
    };
}
