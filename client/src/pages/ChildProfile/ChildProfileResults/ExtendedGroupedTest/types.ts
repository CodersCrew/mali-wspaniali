import { AssessmentParam } from '../../../../graphql/types';

export type MeasurementProps = {
    valueInUnitOfMeasure: number;
    valueInPoints: number;
    unitOfMeasure: string;
    translationKey: string;
    param?: AssessmentParam;
};
