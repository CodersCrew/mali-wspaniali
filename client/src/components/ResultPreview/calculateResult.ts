import { resultColors } from '@app/colors';
import { AssessmentParam } from '@app/graphql/types';
import { countInvertedPoints, countPoints } from '@app/pages/InstructorResultCreatorPage/countPoints';

export interface Calculation {
    color: string;
    lightColor: string;
    key: string;
    nextKey: string | null;
    maxValueInPoints: number;
    valueInPoints: number;
    scale39InPoints: number;
    scale49InPoints: number;
    scale59InPoints: number;
    minScaleInPoints: number;
    maxScaleInPoints: number;
}

export const testResults = {
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

    const scale39InPoints = count(param?.scale39 || 0, param);
    const scale49InPoints = count(param?.scale49 || 0, param);
    const scale59InPoints = count(param?.scale59 || 0, param);
    const minScaleInPoints = count(param?.minScale || 0, param);
    const maxScaleInPoints = count(param?.maxScale || 0, param);

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
