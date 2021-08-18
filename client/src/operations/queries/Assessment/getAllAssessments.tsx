import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Assessment } from '../../../graphql/types';

export interface GetAllAssessmentsResponse {
    assessments: Assessment[];
}

interface UseAssessmentReturn {
    assessments: Assessment[];
    refetchAssessments: () => void;
    areAssessmentsLoading: boolean;
}

interface Options {
    withChildren?: boolean;
}

export const GET_ALL_ASSESSMENTS = gql`
    {
        assessments {
            _id
            isOutdated
            isDeleted
            title
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
            firstMeasurementStartDate
            firstMeasurementEndDate
            lastMeasurementStartDate
            lastMeasurementEndDate
        }
    }
`;

const GET_ALL_ASSESSMENTS_WITH_CHILDREN = gql`
    {
        assessments {
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
                    children {
                        _id
                        firstname
                        lastname
                        birthYear
                        birthQuarter
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
                            }
                        }
                    }
                }
                instructor {
                    _id
                    mail
                }
            }
        }
    }
`;

export function useAssessments(options?: Options): UseAssessmentReturn {
    const query = options?.withChildren ? GET_ALL_ASSESSMENTS_WITH_CHILDREN : GET_ALL_ASSESSMENTS;

    const [refetchAssessments, { data, loading }] = useLazyQuery<GetAllAssessmentsResponse>(query);

    useEffect(() => {
        refetchAssessments();
    }, []);

    return {
        assessments: data?.assessments || [],
        refetchAssessments,
        areAssessmentsLoading: loading,
    };
}
