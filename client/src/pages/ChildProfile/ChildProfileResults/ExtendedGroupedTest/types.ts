import { AssessmentParam } from '../../../../graphql/types';

export type ResultsData = {
    v1: number;
    v2: number;
    v3: number;
    v4: number;
    v5: number;
    unit: string;
    result: number;
    resultStart: number;
    hasScoreRangeLabels: boolean;
    sex: string;
};

export type MeasurementProps = {
    valueInUnitOfMeasure: number;
    valueInPoints: number;
    unitOfMeasure: string;
    translationKey: string;
    param?: AssessmentParam;
};
