import { gql, useMutation, FetchResult } from '@apollo/client';
import { ReturnedStatusDTO } from '../../../graphql/types';
import { AssessmentResponse, GET_ASSESSMENT } from '../../queries/Assessment/getAssessment';
import { KindergartenListResponse, KINDERGARTENS } from '../../queries/Kindergartens/getKindergartens';

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
    updateAssessment: (assessment: Partial<UpdatedAssessmentInput>) => Promise<FetchResult<ReturnedStatusDTO>>;
}

export const UPDATE_ASSESSMENT = gql`
    mutation UpdateAssessment($id: String!, $assessment: UpdatedAssessmentInput!) {
        updateAssessment(id: $id, assessment: $assessment) {
            status
        }
    }
`;

export function useUpdateAssessment(id: string): UpdateAssessment {
    const [updateAssessment] = useMutation(UPDATE_ASSESSMENT);

    return {
        updateAssessment: (updatedAssessment) => {
            return updateAssessment({
                variables: { id, assessment: updatedAssessment },
                update(cache) {
                    const cachedAssessment = cache.readQuery<AssessmentResponse>({
                        query: GET_ASSESSMENT,
                        variables: { id },
                    });

                    if (!cachedAssessment) return;

                    const kindergartenList = cache.readQuery<KindergartenListResponse>({ query: KINDERGARTENS }) || {
                        kindergartens: [],
                    };

                    const updatedKindergartens = kindergartenList.kindergartens
                        .filter((cachedKindergarten) => {
                            return !!updatedAssessment.kindergartens?.find(
                                (updatedKindergarten) => updatedKindergarten.kindergartenId === cachedKindergarten._id,
                            );
                        })
                        .map((kindergarten) => ({ kindergarten, instructor: null })); // TODO: cach should be aware of the instructor

                    cache.writeQuery({
                        query: GET_ASSESSMENT,
                        variables: { id },
                        data: {
                            assessment: {
                                ...cachedAssessment.assessment,
                                ...updatedAssessment,
                                kindergartens: updatedKindergartens,
                            },
                        },
                    });
                },
            });
        },
    };
}
