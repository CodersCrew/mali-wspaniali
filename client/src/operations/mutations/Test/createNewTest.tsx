import { gql, useMutation } from '@apollo/client';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

export interface TestInformation {
    testName: string;
    startDate: string;
    endDate: string;
}

export const CREATE_NEW_TEST = gql`
    mutation createAssessment($title: String!, $startDate: String!, $endDate: String!, $kindergartens: [String!]!) {
        createAssessment(
            assessment: { title: $title, startDate: $startDate, endDate: $endDate, kindergartenIds: $kindergartens }
        ) {
            status
        }
    }
`;

export function useCreateNewTest() {
    const [mutate, { data, error }] = useMutation<Test>(CREATE_NEW_TEST);

    return {
        createTest: ({ testName, startDate, endDate }: TestInformation, kindergartens: string[]) => {
            return mutate({
                variables: {
                    title: testName,
                    startDate,
                    endDate,
                    kindergartens,
                },
            });
        },
        data,
        error,
    };
}
