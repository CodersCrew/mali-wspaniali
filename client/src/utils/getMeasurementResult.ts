import { KindergartenWithChildren } from '../graphql/types';
import { AssessmentType } from '../pages/TestResultsPage/TestToggleButton';

export const getMeasurementResult = (assessmentType: AssessmentType, kindergarten: KindergartenWithChildren) => {
    switch (assessmentType) {
        case 'PP':
            return kindergarten.kindergarten.firstMeasurementResultCount;
        case 'PK':
            return kindergarten.kindergarten.lastMeasurementResultCount;
        default: {
            // eslint-disable-next-line no-case-declarations
            const x: never = assessmentType;

            return x;
        }
    }
};
