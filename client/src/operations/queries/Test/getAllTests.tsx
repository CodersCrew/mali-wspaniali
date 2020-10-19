import { gql, useQuery } from "@apollo/client";
import { Test } from '../../../graphql/types';

interface TestListResponse {
    assessments: Test[];
}

export const TESTS = gql`
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

export function useTests() {
    const { data, loading } = useQuery<TestListResponse>(TESTS);

    return {
        testList: data?.assessments || [],
        isTestListLoading: loading
    }
}