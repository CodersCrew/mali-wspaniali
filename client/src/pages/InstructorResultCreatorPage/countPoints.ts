import { AssessmentParam, Child } from '../../graphql/types';
import type { AssessmentValues } from './useResultCreator';

export function countPoints(value: number, param: AssessmentParam) {
    if (value === 0) return 0;

    const points = param.a * value + param.b;

    if (points < param.upperLimitPoints) return param.upperLimitPoints;

    if (points > param.lowerLimitPoints) return param.lowerLimitPoints;

    return points;
}

export function countInvertedPoints(value: number, param: AssessmentParam) {
    if (value === 0) return 0;

    const points = param.a * value + param.b;

    if (points > param.upperLimitPoints) return param.upperLimitPoints;

    if (points < param.lowerLimitPoints) return param.lowerLimitPoints;

    return points;
}

export function countCurrentPoints(values: AssessmentValues, { currentParams }: Child) {
    if (!currentParams) {
        return {
            run: 0,
            pendelumRun: 0,
            throw: 0,
            jump: 0,
        };
    }

    return {
        run: currentParams.run ? countPoints(values.run, currentParams.run) : 0,
        pendelumRun: currentParams.pendelumRun ? countPoints(values.pendelumRun, currentParams.pendelumRun) : 0,
        throw: currentParams.throw ? countInvertedPoints(values.throw, currentParams.throw) : 0,
        jump: currentParams.jump ? countInvertedPoints(values.jump, currentParams.jump) : 0,
    };
}
