import { gql, useMutation } from '@apollo/client';
import { client } from '../../../apollo_client';
import { GetAllAssessmentsResponse, GET_ALL_ASSESSMENTS } from '../../queries/Assessment/getAllAssessments';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

export interface CreatedAssessmentInput {
    title: string;
    firstMeasurementStartDate: string;
    firstMeasurementEndDate: string;
    lastMeasurementStartDate: string;
    lastMeasurementEndDate: string;
    firstMeasurementStatus: string;
    lastMeasurementStatus: string;
    kindergartenIds: string[];
}

interface CreateAssessmentResponse {
    createAssessment: Test;
}

export const CREATE_ASSESSMENT = gql`
    mutation createAssessment($assessment: AssessmentInput!) {
        createAssessment(assessment: $assessment) {
            _id
            isOutdated
            isDeleted
            title
            firstMeasurementStartDate
            firstMeasurementEndDate
            lastMeasurementStartDate
            lastMeasurementEndDate
            firstMeasurementStatus
            lastMeasurementStatus
            kindergartens {
                kindergarten {
                    _id
                    name
                    number
                    address
                }
                instructor {
                    _id
                    mail
                }
            }
        }
    }
`;

export function useCreateAssessment() {
    const [mutate, { data, error, loading }] = useMutation<CreateAssessmentResponse>(CREATE_ASSESSMENT);

    return {
        createAssessment: (assessment: CreatedAssessmentInput) => {
            return mutate({
                variables: { assessment },
            }).then((result) => {
                const cachedAssessments = client.readQuery<GetAllAssessmentsResponse>({
                    query: GET_ALL_ASSESSMENTS,
                });

                if (result.data && cachedAssessments) {
                    client.writeQuery({
                        query: GET_ALL_ASSESSMENTS,
                        data: {
                            assessments: [...cachedAssessments.assessments, result.data.createAssessment],
                        },
                    });
                }

                return result;
            });
        },
        isCreationPending: loading,
        data,
        error,
    };
}
