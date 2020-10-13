import { gql, useMutation } from '@apollo/client';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

export const CREATE_NEW_TEST = gql`
    mutation createAssessment($title: String!) {
        createAssessment(title: $title) {
            status
        }
    }
`;

export function useCreateNewTest() {
    const [mutate, { data, error }] = useMutation<Test>(CREATE_NEW_TEST);

    return {
        createTest: (title: string) => {
            return mutate({
                variables: {
                    title,
                },
            });
        },
        data,
        error,
    };
}
