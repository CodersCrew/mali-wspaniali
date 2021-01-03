import { gql, useMutation, FetchResult } from '@apollo/client';
import { AssessmentResponse } from '../../queries/Assessment/getAssessment';

interface UpdatedAssessmentInput {
    title: string;
    startDate: string;
    endDate: string;
    status: string;
    isOutdated: boolean;
    isDeleted: boolean;
    kindergartens: Array<{ kindergartenId: string; instructorId: string | undefined }>;
}

interface UpdateAssessment {
    updateAssessment: (assessment: Partial<UpdatedAssessmentInput>) => Promise<FetchResult<AssessmentResponse>>;
    isUpdatePending: boolean;
}

export const UPDATE_ASSESSMENT = gql`
    mutation UpdateAssessment($id: String!, $assessment: UpdatedAssessmentInput!) {
        updateAssessment(id: $id, assessment: $assessment) {
            _id
            isOutdated
            isDeleted
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

export function useUpdateAssessment(id: string): UpdateAssessment {
    const [updateAssessment, { loading }] = useMutation(UPDATE_ASSESSMENT);

    return {
        updateAssessment: (updatedAssessment) => {
            return updateAssessment({
                variables: { id, assessment: updatedAssessment },
            });
        },
        isUpdatePending: loading,
    };
}
