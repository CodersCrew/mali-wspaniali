import { KindergartenWithChildren } from '../graphql/types';
import { MeasurementType } from '../pages/TestResultsPage/TestToggleButton';

export const getMeasurementResult = (assessmentType: MeasurementType, kindergarten: KindergartenWithChildren) => {
    switch (assessmentType) {
        case 'first':
            return kindergarten.kindergarten.firstMeasurementResultCount;
        case 'last':
            return kindergarten.kindergarten.lastMeasurementResultCount;
        default: {
            // eslint-disable-next-line no-case-declarations
            const x: never = assessmentType;

            return x;
        }
    }
};
