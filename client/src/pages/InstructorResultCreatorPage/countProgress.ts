import { AssessmentResult } from '../../graphql/types';

export function countProgress(measurement: string, result: AssessmentResult) {
    let count = 0;

    if (measurement === 'first') {
        if (result.firstMeasurementJumpResult) {
            count += 1;
        }

        if (result.firstMeasurementPendelumRunResult) {
            count += 1;
        }

        if (result.firstMeasurementRunResult) {
            count += 1;
        }

        if (result.firstMeasurementThrowResult) {
            count += 1;
        }
    } else {
        if (result.lastMeasurementJumpResult) {
            count += 1;
        }

        if (result.lastMeasurementPendelumRunResult) {
            count += 1;
        }

        if (result.lastMeasurementRunResult) {
            count += 1;
        }

        if (result.lastMeasurementThrowResult) {
            count += 1;
        }
    }

    return count;
}
