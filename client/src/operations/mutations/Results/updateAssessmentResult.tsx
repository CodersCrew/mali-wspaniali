import { gql, useMutation } from '@apollo/client';
import { AssessmentResult } from '../../../graphql/types';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

export interface UpdatedAssessmentInput {
    _id: string;
    childId: string;
    kindergartenId: string;
    assessmentId: string;
    firstMeasurementGroup: string;
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

interface UpdateAssessmentResponse {
    createAssessmentResult: AssessmentResult;
}

export const UPDATE_RESULT = gql`
    mutation updateResult($result: PartialUpdateChildResultInput!) {
        updateAssessmentResult(result: $result) {
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

export function useUpdateAssessmentResult() {
    const [mutate, { data, error, loading }] = useMutation<UpdateAssessmentResponse>(UPDATE_RESULT);

    return {
        updateAssessmentResult: (result: Partial<UpdatedAssessmentInput>) => {
            return mutate({
                variables: { result },
            });
        },
        isUpdatePending: loading,
        data,
        error,
    };
}
