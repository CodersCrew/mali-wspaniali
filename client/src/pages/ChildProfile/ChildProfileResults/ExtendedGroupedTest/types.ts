import { AssessmentParam } from '@app/graphql/types';

export type MeasurementProps = {
    value: number;
    valueInPoints: number;
    unitOfMeasure: string;
    translationKey: string;
    param?: AssessmentParam;
};
