import { AssessmentResult } from '../graphql/types';

export function countSumOfPoints(result: AssessmentResult) {
    const {
        firstMeasurementJumpResult,
        firstMeasurementPendelumRunResult,
        firstMeasurementRunResult,
        firstMeasurementThrowResult,
        lastMeasurementJumpResult,
        lastMeasurementPendelumRunResult,
        lastMeasurementRunResult,
        lastMeasurementThrowResult,
    } = result;

    const sumOfPointsFirstMeasurement =
        firstMeasurementJumpResult +
        firstMeasurementPendelumRunResult +
        firstMeasurementRunResult +
        firstMeasurementThrowResult;
    const sumOfPointsLastMeasurement =
        lastMeasurementJumpResult +
        lastMeasurementPendelumRunResult +
        lastMeasurementRunResult +
        lastMeasurementThrowResult;

    return { sumOfPointsFirstMeasurement, sumOfPointsLastMeasurement };
}
