import { useEffect } from 'react';
import { ApolloQueryResult, gql, useLazyQuery } from '@apollo/client';
import { AssessmentResult } from '@app/graphql/types';

export interface AssessmentResponse {
    kindergartenResults: AssessmentResult[];
}

interface UseAssessmentReturn {
    kindergartenResults: AssessmentResult[];
    areAssessmentsResultsLoading: boolean;
    refetchResults: () => Promise<ApolloQueryResult<AssessmentResponse>> | undefined;
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
            firstMeasurementGroup
            lastMeasurementGroup
        }
    }
`;

export function useAssessmentResults(kindergartenId: string, assessmentId: string): UseAssessmentReturn {
    const [getResults, { data, loading, refetch }] = useLazyQuery<AssessmentResponse>(GET_ASSESSMENT_RESULTS);

    useEffect(() => {
        if (assessmentId?.length && kindergartenId?.length) {
            getResults({ variables: { kindergartenId, assessmentId } });
        }
    }, [assessmentId, kindergartenId, getResults]);

    return {
        kindergartenResults: data?.kindergartenResults || [],
        areAssessmentsResultsLoading: loading,
        refetchResults: () => {
            if (!refetch) return;

            return refetch({ variables: { kindergartenId, assessmentId } });
        },
    };
}
