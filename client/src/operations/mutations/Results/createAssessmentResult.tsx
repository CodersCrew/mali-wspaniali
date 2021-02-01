import { gql, useMutation } from '@apollo/client';
import { AssessmentResult } from '../../../graphql/types';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

export interface CreatedAssessmentInput {
    childId: string;
    kindergartenId: string;
    assessmentId: string;
    firstMeasurementRunDate: Date;
    lastMeasurementRunDate: Date;
    firstMeasurementPendelumRunDate: Date;
    lastMeasurementPendelumRunDate: Date;
    firstMeasurementThrowDate: Date;
    lastMeasurementThrowDate: Date;
    firstMeasurementJumpDate: Date;
    lastMeasurementJumpDate: Date;
    firstMeasurementNote: string;
    lastMeasurementNote: string;
    firstMeasurementKindergarten: string;
    lastMeasurementKindergarten: string;
    firstMeasurementInstructor: string;
    lastMeasurementInstructor: string;
    firstMeasurementRunResult: number;
    lastMeasurementRunResult: number;
    firstMeasurementPendelumRunResult: number;
    lastMeasurementPendelumRunResult: number;
    firstMeasurementThrowResult: number;
    lastMeasurementThrowResult: number;
    firstMeasurementJumpResult: number;
    lastMeasurementJumpResult: number;
}

interface CreateAssessmentResponse {
    createAssessmentResult: AssessmentResult;
}

export const CREATE_RESULT = gql`
    mutation createResult($result: PartialChildResultInput!) {
        createAssessmentResult(result: $result) {
            _id
            childId
            kindergartenId
            assessmentId
            firstMeasurementNote
            lastMeasurementNote
            firstMeasurementRunResult
            lastMeasurementRunResult
            firstMeasurementPendelumRunResult
            lastMeasurementPendelumRunResult
            firstMeasurementThrowResult
            lastMeasurementThrowResult
            firstMeasurementJumpResult
            lastMeasurementJumpResult
            firstMeasurementRunDate
            lastMeasurementRunDate
            firstMeasurementPendelumRunDate
            lastMeasurementPendelumRunDate
            firstMeasurementThrowDate
            lastMeasurementThrowDate
            firstMeasurementJumpDate
            lastMeasurementJumpDate
        }
    }
`;

export function useCreateAssessmentResult() {
    const [mutate, { data, error, loading }] = useMutation<CreateAssessmentResponse>(CREATE_RESULT);

    return {
        createAssessmentResult: (result: Partial<CreatedAssessmentInput>) => {
            return mutate({
                variables: { result },
                update: (cache, response) => {
                    cache.modify({
                        fields: {
                            kindergartenResults(existingResults = []) {
                                return [
                                    ...existingResults,
                                    { ____ref: `PartialChildResult:${response.data?.createAssessmentResult._id}` },
                                ];
                            },
                        },
                    });
                },
            });
        },
        isCreationPending: loading,
        data,
        error,
    };
}
