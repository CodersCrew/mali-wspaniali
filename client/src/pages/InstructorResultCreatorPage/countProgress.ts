import { AssessmentResult } from '../../graphql/types';

export function countProgress(measurement: string, result: AssessmentResult) {
    let count = 0;

    if (measurement === 'first') {
        if (result.firstMeasurementJumpDate) {
            count += 1;
        }

        if (result.firstMeasurementPendelumRunDate) {
            count += 1;
        }

        if (result.firstMeasurementRunDate) {
            count += 1;
        }

        if (result.firstMeasurementThrowDate) {
            count += 1;
        }
    } else {
        if (result.lastMeasurementJumpDate) {
            count += 1;
        }

        if (result.lastMeasurementPendelumRunDate) {
            count += 1;
        }

        if (result.lastMeasurementRunDate) {
            count += 1;
        }

        if (result.lastMeasurementThrowDate) {
            count += 1;
        }
    }

    return count;
}
