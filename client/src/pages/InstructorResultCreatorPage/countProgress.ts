import { AssessmentResult } from '@app/graphql/types';

export function countProgress(measurement: string, result: AssessmentResult) {
    let count = 0;

    if (measurement === 'first') {
        if (result.firstMeasurementJumpDate && result.firstMeasurementJumpResult) {
            count += 1;
        }

        if (result.firstMeasurementPendelumRunDate && result.firstMeasurementPendelumRunResult) {
            count += 1;
        }

        if (result.firstMeasurementRunDate && result.firstMeasurementRunResult) {
            count += 1;
        }

        if (result.firstMeasurementThrowDate && result.firstMeasurementThrowResult) {
            count += 1;
        }
    } else {
        if (result.lastMeasurementJumpDate && result.lastMeasurementJumpResult) {
            count += 1;
        }

        if (result.lastMeasurementPendelumRunDate && result.lastMeasurementPendelumRunResult) {
            count += 1;
        }

        if (result.lastMeasurementRunDate && result.lastMeasurementRunResult) {
            count += 1;
        }

        if (result.lastMeasurementThrowDate && result.lastMeasurementThrowResult) {
            count += 1;
        }
    }

    return count;
}
