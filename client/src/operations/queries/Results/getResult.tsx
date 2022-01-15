import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { AssessmentResult } from '../../../graphql/types';

export interface AssessmentResponse {
    result: AssessmentResult | null;
}

interface UseAssessmentReturn {
    result: AssessmentResult | null;
    isResultLoading: boolean;
}

export const GET_ASSESSMENT_RESULTS = gql`
    query Result($id: String!) {
        result(id: $id) {
            _id
            createdAt
            modifiedAt
            childId
            kindergartenId
            assessmentId
            assessment {
                _id
                title
                firstMeasurementStatus
                lastMeasurementStatus
            }
            child {
                _id
                firstname
                lastname
                sex
                birthYear
                birthQuarter
                age
            }
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
            firstMeasurementRunDate
            lastMeasurementRunDate
            firstMeasurementPendelumRunDate
            lastMeasurementPendelumRunDate
            firstMeasurementThrowDate
            lastMeasurementThrowDate
            firstMeasurementJumpDate
            lastMeasurementJumpDate
            firstMeasurementNote
            lastMeasurementNote
            firstMeasurementKindergarten
            lastMeasurementKindergarten
            firstMeasurementInstructor
            lastMeasurementInstructor
            firstMeasurementRunResult
            lastMeasurementRunResult
            firstMeasurementPendelumRunResult
            lastMeasurementPendelumRunResult
            firstMeasurementThrowResult
            lastMeasurementThrowResult
            firstMeasurementJumpResult
            lastMeasurementJumpResult
        }
    }
`;

export function useResult(id: string): UseAssessmentReturn {
    const [getResults, { data, loading }] = useLazyQuery<AssessmentResponse>(GET_ASSESSMENT_RESULTS);

    useEffect(() => {
        getResults({ variables: { id } });
    }, [id, getResults]);

    return {
        result: data?.result || null,
        isResultLoading: loading,
    };
}
