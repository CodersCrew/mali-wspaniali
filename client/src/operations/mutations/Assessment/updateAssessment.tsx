import { gql, useMutation, FetchResult } from '@apollo/client';
import pick from 'lodash.pick';
import { AssessmentResponse } from '../../queries/Assessment/getAssessment';

export type UpdatedAssessmentInput = {
    title: string;
    status: string;
    isOutdated: boolean;
    isDeleted: boolean;
    kindergartens: Array<{ kindergartenId?: string; instructorId?: string }>;
    firstMeasurementStartDate: string;
    firstMeasurementEndDate: string;
    lastMeasurementStartDate: string;
    lastMeasurementEndDate: string;
    firstMeasurementStatus: string;
    lastMeasurementStatus: string;
    groups: Array<{ kindergartenId: string; group: string }>;
};

interface UpdateAssessment {
    updateAssessment: (
        id: string,
        assessment: Partial<UpdatedAssessmentInput>,
    ) => Promise<FetchResult<AssessmentResponse>>;
    isUpdatePending: boolean;
}

export const UPDATE_ASSESSMENT = gql`
    mutation UpdateAssessment($id: String!, $assessment: UpdatedAssessmentInput!) {
        updateAssessment(id: $id, assessment: $assessment) {
            _id
            isOutdated
            isDeleted
            title
            firstMeasurementStatus
            lastMeasurementStatus
            firstMeasurementStartDate
            firstMeasurementEndDate
            lastMeasurementStartDate
            lastMeasurementEndDate
            kindergartens {
                kindergarten {
                    _id
                    name
                    number
                    address
                    city
                }
                instructor {
                    _id
                    mail
                }
            }
        }
    }
`;

export function useUpdateAssessment(): UpdateAssessment {
    const [updateAssessment, { loading }] = useMutation(UPDATE_ASSESSMENT);

    return {
        updateAssessment: (id: string, updatedAssessment) => {
            return updateAssessment({
                variables: {
                    id,
                    assessment: pick(updatedAssessment, [
                        'title',
                        'firstMeasurementStartDate',
                        'firstMeasurementEndDate',
                        'lastMeasurementStartDate',
                        'lastMeasurementEndDate',
                        'firstMeasurementStatus',
                        'lastMeasurementStatus',
                        'kindergartens',
                        'isOutdated',
                        'isDeleted',
                        'groups',
                    ]),
                },
            });
        },
        isUpdatePending: loading,
    };
}
