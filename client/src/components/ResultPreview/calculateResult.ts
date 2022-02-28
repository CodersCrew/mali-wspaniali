import { resultColors } from '@app/colors';
import { AssessmentParam, AssessmentResult } from '@app/graphql/types';
import { countInvertedPoints, countPoints } from '@app/pages/InstructorResultCreatorPage/countPoints';

export type ResultKeys = 'scale39' | 'scale49' | 'scale59' | 'maxScale';
type ResultInterpretation = 'bad' | 'weak' | 'good' | 'veryGood';
type Unit = 'cm' | 's';
export type MeasurementName = 'Run' | 'PendelumRun' | 'Throw' | 'Jump';

export interface Calculation {
    color: string;
    lightColor: string;
    key: ResultKeys;
    nextKey: ResultKeys | null;
    maxValueInPoints: number;
    valueInPoints: number;
    scale39InPoints: number;
    scale49InPoints: number;
    scale59InPoints: number;
    minScaleInPoints: number;
    maxScaleInPoints: number;
}

export function interprateResult(value: number, param: AssessmentParam, name: MeasurementName): ResultInterpretation {
    const { valueInPoints, scale39InPoints, scale49InPoints, scale59InPoints } = countPointsOf(value, param, name);

    if (valueInPoints < scale39InPoints) return 'bad';
    if (valueInPoints < scale49InPoints) return 'weak';
    if (valueInPoints < scale59InPoints) return 'good';

    return 'veryGood';
}

export function nextInterpretation(interpretation: string): string | null {
    if (interpretation === 'bad') return 'weak';
    if (interpretation === 'weak') return 'good';
    if (interpretation === 'good') return 'veryGood';

    return null;
}

function countPointsOf(value: number, param: AssessmentParam, name: MeasurementName) {
    const count = countMeasurementResultInPoints(name);
    const valueInPoints = count(value, param);

    const scale39InPoints = count(param.scale39, param);
    const scale49InPoints = count(param.scale49, param);
    const scale59InPoints = count(param.scale59, param);

    return {
        valueInPoints,
        scale39InPoints,
        scale49InPoints,
        scale59InPoints,
    };
}

export function countSumOfPoints(value1: number, value2: number, param: AssessmentParam, name: MeasurementName) {
    const measurementsInPoints1 = countPointsOf(value1, param, name);
    const measurementsInPoints2 = countPointsOf(value2, param, name);

    return {
        valueInPoints: measurementsInPoints1.valueInPoints + measurementsInPoints2.valueInPoints,
        scale39InPoints: measurementsInPoints1.scale39InPoints + measurementsInPoints2.scale39InPoints,
        scale49InPoints: measurementsInPoints1.scale49InPoints + measurementsInPoints2.scale49InPoints,
        scale59InPoints: measurementsInPoints1.scale59InPoints + measurementsInPoints2.scale59InPoints,
    };
}

export function unitOf(name: MeasurementName): Unit {
    const normalizedName = normalizeMeasureName(name);

    if (normalizedName === 'Run' || normalizedName === 'PendelumRun') return 's';

    return 'cm';
}

export function paramOf(result: AssessmentResult, name: MeasurementName): AssessmentParam | undefined {
    const normalizedParamName = lowerMeasureName(name);

    return result.currentParams[normalizedParamName as keyof typeof result.currentParams];
}

export function measurementResultColor(value: number, param: AssessmentParam, name: MeasurementName) {
    const interpretation = interprateResult(value, param, name);

    if (interpretation === 'bad') return resultColors.red;
    if (interpretation === 'weak') return resultColors.yellow;
    if (interpretation === 'good') return resultColors.green;

    return resultColors.green;
}

export function measurementResult(name: string, assessmentPeriod: string, result: AssessmentResult): number {
    const normalizedName = normalizeMeasureName(name);
    const measurementValue = `${assessmentPeriod}Measurement${normalizedName}Result`;

    return (result[measurementValue as keyof AssessmentResult] as number) || 0;
}

export function countMeasurementResultInPoints(name: MeasurementName) {
    return name === 'Run' || name === 'PendelumRun' ? countPoints : countInvertedPoints;
}

export function maxMeasurementValue(param: AssessmentParam): number {
    return Math.max(param.maxScale, param.minScale);
}

export function minMeasurementValue(param: AssessmentParam): number {
    return Math.min(param.maxScale, param.minScale);
}

export function maxMeasurementPoints(param: AssessmentParam): number {
    return Math.max(param.upperLimitPoints, param.lowerLimitPoints);
}

export function minMeasurementPoints(param: AssessmentParam): number {
    return Math.min(param.upperLimitPoints, param.lowerLimitPoints);
}

function normalizeMeasureName(name: string) {
    return name[0].toUpperCase() + name.substring(1);
}

export function lowerMeasureName(name: string) {
    return name[0].toLowerCase() + name.substring(1);
}

export function localizeName(name: string): string {
    return lowerMeasureName(name);
}

export const testResults: Record<string, Partial<Calculation>> = {
    bad: {
        color: resultColors.red,
        lightColor: resultColors.lightRed,
        key: 'scale39',
        nextKey: 'scale49',
    },
    weak: {
        color: resultColors.yellow,
        lightColor: resultColors.lightYellow,
        key: 'scale49',
        nextKey: 'scale59',
    },
    good: {
        color: resultColors.green,
        lightColor: resultColors.lightGreen,
        key: 'scale59',
        nextKey: 'maxScale',
    },
    veryGood: {
        color: resultColors.green,
        lightColor: resultColors.lightGreen,
        key: 'maxScale',
        nextKey: null,
    },
};

export function getResultColorAndLabel(value: number, param: AssessmentParam, name: string): Calculation {
    const count = name === 'run' || name === 'pendelumRun' ? countPoints : countInvertedPoints;
    const valueInPoints = count(value, param);

    let result: Partial<Calculation>;

    const scale39InPoints = count(param.scale39, param);
    const scale49InPoints = count(param.scale49, param);
    const scale59InPoints = count(param.scale59, param);
    const minScaleInPoints = count(param.minScale, param);
    const maxScaleInPoints = count(param.maxScale, param);

    if (valueInPoints < scale39InPoints) {
        result = testResults.bad;
    } else if (valueInPoints < scale49InPoints) {
        result = testResults.weak;
    } else if (valueInPoints < scale59InPoints) {
        result = testResults.good;
    } else {
        result = testResults.veryGood;
    }

    const maxValueInPoints = Math.max(count(param.maxScale, param), count(param.minScale, param));

    return {
        ...result,
        maxValueInPoints,
        valueInPoints,
        scale39InPoints,
        scale49InPoints,
        scale59InPoints,
        minScaleInPoints,
        maxScaleInPoints,
    } as Calculation;
}
