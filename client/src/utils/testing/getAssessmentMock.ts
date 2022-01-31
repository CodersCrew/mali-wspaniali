import { Assessment } from '@app/graphql/types';

export function getAssessmentMock(options: Partial<Assessment> = {}): Partial<Assessment> {
    return {
        _id: 'my-result-id',
        title: '',
        firstMeasurementStatus: 'done',
        lastMeasurementStatus: 'done',
        ...options,
    };
}
