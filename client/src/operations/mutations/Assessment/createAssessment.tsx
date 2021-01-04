import { gql, useMutation } from '@apollo/client';
import { client } from '../../../apollo_client';
import { GetAllAssessmentsResponse, GET_ALL_ASSESSMENTS } from '../../queries/Assessment/getAllAssessments';

export interface Test {
    title: string;
    firstAssessment: string;
    lastAssessment: string;
    status: string;
}

interface CreateAssessmentResponse {
    createAssessment: Test;
}

interface AssessmentInput {
    title: string;
    startDate: string;
    endDate: string;
    kindergartenIds: string[];
}

export const CREATE_ASSESSMENT = gql`
    mutation createAssessment($title: String!, $startDate: String!, $endDate: String!, $kindergartenIds: [String!]!) {
        createAssessment(
            assessment: { title: $title, startDate: $startDate, endDate: $endDate, kindergartenIds: $kindergartenIds }
        ) {
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

export function useCreateAssessment() {
    const [mutate, { data, error, loading }] = useMutation<CreateAssessmentResponse>(CREATE_ASSESSMENT);

    return {
        createAssessment: ({ title, startDate, endDate, kindergartenIds }: AssessmentInput) => {
            return mutate({
                variables: {
                    title,
                    startDate,
                    endDate,
                    kindergartenIds,
                },
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
