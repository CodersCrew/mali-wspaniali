import { useQuery, gql } from '@apollo/client';
import { Me } from '../../../graphql/types';

export const GET_ME = gql`
    {
        me {
            createdAt
            mail
            children {
                _id
                firstname
                lastname
                sex
                birthYear
                birthQuarter
                results {
                    _id
                    createdAt
                    modifiedAt
                    childId
                    kindergartenId
                    assessmentId
                    assessment {
                        _id
                        title
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
                kindergarten {
                    _id
                    name
                    number
                }
            }
            agreements {
                _id
                createdAt
                text
                isSigned
            }
            role
            notifications {
                _id
                createdAt
                values
                templateId
                isRead
            }
        }
    }
`;

export function useGetMe() {
    const { data, refetch } = useQuery<{ me: Me }>(GET_ME);

    return { user: data?.me, refetch };
}
