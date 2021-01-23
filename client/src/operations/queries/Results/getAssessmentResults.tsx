import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { AssessmentResult } from '../../../graphql/types';

export interface AssessmentResponse {
    kindergartenResults: AssessmentResult[];
}

interface UseAssessmentReturn {
    kindergartenResults: AssessmentResult[];
    areAssessmentsResultsLoading: boolean;
}

export const GET_ASSESSMENT_RESULTS = gql`
    query KindergartenResults($kindergartenId: String!, $assessmentId: String!) {
        kindergartenResults(kindergartenId: $kindergartenId, assessmentId: $assessmentId) {
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

export function useAssessmentResults(
    kindergartenId: string | undefined,
    assessmentId: string | undefined,
): UseAssessmentReturn {
    const [getResults, { data, loading }] = useLazyQuery<AssessmentResponse>(GET_ASSESSMENT_RESULTS);

    useEffect(() => {
        if (assessmentId?.length && kindergartenId?.length) {
            getResults({ variables: { kindergartenId, assessmentId } });
        }
    }, [assessmentId, kindergartenId, getResults]);

    return {
        kindergartenResults: data?.kindergartenResults || [],
        areAssessmentsResultsLoading: loading,
    };
}
