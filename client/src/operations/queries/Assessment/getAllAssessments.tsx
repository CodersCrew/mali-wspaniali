import { gql, useQuery } from '@apollo/client';

import { Assessment } from '../../../graphql/types';

export interface GetAllAssessmentsResponse {
    assessments: Assessment[];
}

interface UseAssessmentReturn {
    assessments: Assessment[];
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
            startDate
            endDate
            status
            firstMeasurementStatus
            lastMeasurementStatus
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
            startDate
            endDate
            firstMeasurementStartDate
            firstMeasurementEndDate
            lastMeasurementStartDate
            lastMeasurementEndDate
            status
            firstMeasurementStatus
            lastMeasurementStatus
            kindergartens {
                kindergarten {
                    _id
                    name
                    number
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
                            }
                            pendelumRun {
                                a
                                b
                                lowerLimit
                                lowerLimitPoints
                                upperLimit
                                upperLimitPoints
                            }
                            jump {
                                a
                                b
                                lowerLimit
                                lowerLimitPoints
                                upperLimit
                                upperLimitPoints
                            }
                            throw {
                                a
                                b
                                lowerLimit
                                lowerLimitPoints
                                upperLimit
                                upperLimitPoints
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

    const { data, loading } = useQuery<GetAllAssessmentsResponse>(query);

    return {
        assessments: data?.assessments || [],
        areAssessmentsLoading: loading,
    };
}
