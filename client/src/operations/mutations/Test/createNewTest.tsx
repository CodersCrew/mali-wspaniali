import { gql, useMutation } from '@apollo/client';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

interface AssessmentInput {
    title: string;
    startDate: string;
    endDate: string;
    kindergartenIds: string[];
}

export const CREATE_NEW_TEST = gql`
    mutation createAssessment($title: String!, $startDate: String!, $endDate: String!, $kindergartenIds: [String!]!) {
        createAssessment(
            assessment: { title: $title, startDate: $startDate, endDate: $endDate, kindergartenIds: $kindergartenIds }
        ) {
            status
        }
    }
`;

export function useCreateNewTest() {
    const [mutate, { data, error }] = useMutation<Test>(CREATE_NEW_TEST);

    return {
        createTest: ({ title, startDate, endDate, kindergartenIds }: AssessmentInput) => {
            return mutate({
                variables: {
                    title,
                    startDate,
                    endDate,
                    kindergartenIds,
                },
            });
        },
        data,
        error,
    };
}
