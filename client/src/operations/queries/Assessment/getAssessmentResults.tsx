import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { AssessmentResultsForDownload } from '@app/graphql/types';

export interface AssessmentResultsResponse {
    assessment: AssessmentResultsForDownload | null;
}

interface UseAssessmentResultsReturn {
    assessmentResults: AssessmentResultsForDownload | null;
    areAssessmentResultsLoading: boolean;
    refetchAssessmentResults: () => void;
}

export const GET_ASSESSMENT_RESULTS = gql`
    query Assessment($id: String!) {
        assessment(id: $id) {
            _id
            firstMeasurementEndDate
            firstMeasurementResultCount
            firstMeasurementStartDate
            firstMeasurementStatus
            isDeleted
            kindergartens {
                kindergarten {
                    _id
                    children {
                        _id
                        results {
                            _id
                            assessmentId
                            child {
                                _id
                                age
                                currentParams {
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
                                firstname
                                lastname
                                sex
                            }
                            kindergartenId

                            firstMeasurementGroup
                            firstMeasurementInstructor
                            firstMeasurementKindergarten
                            firstMeasurementNote

                            firstMeasurementJumpDate
                            firstMeasurementJumpResult
                            firstMeasurementPendelumRunDate
                            firstMeasurementPendelumRunResult
                            firstMeasurementRunDate
                            firstMeasurementRunResult
                            firstMeasurementThrowDate
                            firstMeasurementThrowResult

                            lastMeasurementGroup
                            lastMeasurementInstructor
                            lastMeasurementKindergarten
                            lastMeasurementNote

                            lastMeasurementJumpDate
                            lastMeasurementJumpResult
                            lastMeasurementPendelumRunDate
                            lastMeasurementPendelumRunResult
                            lastMeasurementRunDate
                            lastMeasurementRunResult
                            lastMeasurementThrowDate
                            lastMeasurementThrowResult
                        }
                    }
                    name
                }
            }
            lastMeasurementEndDate
            lastMeasurementResultCount
            lastMeasurementStartDate
            lastMeasurementStatus
            title
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        assessmentResults: data?.assessment || null,
        areAssessmentResultsLoading: loading,
        refetchAssessmentResults: () => {
            if (!refetch) return;

            return refetch({ variables: { id } });
        },
    };
}
