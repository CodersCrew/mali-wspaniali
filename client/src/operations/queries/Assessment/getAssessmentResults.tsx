import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { AssessmentResults } from '@app/graphql/types';

export interface AssessmentResultsResponse {
    assessmentResults?: AssessmentResults;
}

interface UseAssessmentResultsReturn {
    assessmentResults?: AssessmentResultsResponse;
    areAssessmentResultsLoading: boolean;
    refetchAssessmentResults: () => void;
}

export const GET_ASSESSMENT_RESULTS = gql`
    query Assessment($id: String!) {
        assessment(id: $id) {
            _id
            title
            firstMeasurementStartDate
            firstMeasurementEndDate
            firstMeasurementStatus
            firstMeasurementResultCount
            lastMeasurementStartDate
            lastMeasurementEndDate
            lastMeasurementStatus
            lastMeasurementResultCount
            kindergartens {
                kindergarten {
                    _id
                    name
                    children {
                        firstname
                        lastname
                        sex
                        age
                        currentParams {
                            run {
                                a
                                b
                                lowerLimit
                                lowerLimitPoints
                                upperLimit
                                upperLimitPoints
                                badStageLimit
                                weakStageLimit
                                middleStageLimit
                                goodStageLimit
                                veryGoodStageLimit
                                minScale
                                scale39
                                scale49
                                scale59
                                maxScale
                            }
                            pendelumRun {
                                a
                                b
                                lowerLimit
                                lowerLimitPoints
                                upperLimit
                                upperLimitPoints
                                badStageLimit
                                weakStageLimit
                                middleStageLimit
                                goodStageLimit
                                veryGoodStageLimit
                                minScale
                                scale39
                                scale49
                                scale59
                                maxScale
                            }
                            jump {
                                a
                                b
                                lowerLimit
                                lowerLimitPoints
                                upperLimit
                                upperLimitPoints
                                badStageLimit
                                weakStageLimit
                                middleStageLimit
                                goodStageLimit
                                veryGoodStageLimit
                                minScale
                                scale39
                                scale49
                                scale59
                                maxScale
                            }
                            throw {
                                a
                                b
                                lowerLimit
                                lowerLimitPoints
                                upperLimit
                                upperLimitPoints
                                badStageLimit
                                weakStageLimit
                                middleStageLimit
                                goodStageLimit
                                veryGoodStageLimit
                                minScale
                                scale39
                                scale49
                                scale59
                                maxScale
                            }
                        }
                        results {
                            childId
                            kindergartenId
                            assessmentId

                            firstMeasurementNote
                            firstMeasurementGroup
                            firstMeasurementInstructor
                            firstMeasurementKindergarten

                            firstMeasurementRunDate
                            firstMeasurementRunResult
                            firstMeasurementJumpDate
                            firstMeasurementJumpResult
                            firstMeasurementThrowDate
                            firstMeasurementThrowResult
                            firstMeasurementPendelumRunDate
                            firstMeasurementPendelumRunResult

                            lastMeasurementNote
                            lastMeasurementGroup
                            lastMeasurementInstructor
                            lastMeasurementKindergarten

                            lastMeasurementRunDate
                            lastMeasurementRunResult
                            lastMeasurementJumpDate
                            lastMeasurementJumpResult
                            lastMeasurementThrowDate
                            lastMeasurementThrowResult
                            lastMeasurementPendelumRunDate
                            lastMeasurementPendelumRunResult
                        }
                    }
                }
            }
        }
    }
`;

export function useAssessmentResults(id: string | undefined): UseAssessmentResultsReturn {
    const [getTest, { data, loading, refetch }] = useLazyQuery<AssessmentResultsResponse>(GET_ASSESSMENT_RESULTS);

    useEffect(() => {
        if (id) {
            getTest({ variables: { id } });
        }
    }, [id, getTest]);

    return {
        assessmentResults: data,
        areAssessmentResultsLoading: loading,
        refetchAssessmentResults: () => {
            if (!refetch) return;

            return refetch({ variables: { id } });
        },
    };
}
