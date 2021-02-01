import { gql, useMutation } from '@apollo/client';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

export interface CreatedAssessmentInput {
    firstMeasurementNote: string;
    lastMeasurementNote: string;
}

interface CreateAssessmentResponse {
    createAssessmentResult: Test;
}

export const CREATE_RESULT = gql`
    mutation createResult($childId: String!, $result: PartialChildResultInput!) {
        createAssessmentResult(childId: $childId, result: $result) {
            _id
            firstMeasurementNote
            lastMeasurementNote
        }
    }
`;

export function useCreateAssessmentResult() {
    const [mutate, { data, error, loading }] = useMutation<CreateAssessmentResponse>(CREATE_RESULT);

    return {
        createAssessmentResult: (childId: string, result: Partial<CreatedAssessmentInput>) => {
            return mutate({
                variables: { childId, result },
            });
        },
        isCreationPending: loading,
        data,
        error,
    };
}
