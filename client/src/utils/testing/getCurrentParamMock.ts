import { AssessmentParam } from '@app/graphql/types';

export function getCurrentParamMock() {
    return {
        run: createParam(),
        pendelumRun: createParam(),
        jump: createParam(),
        throw: createParam(),
    };
}

function createParam(): AssessmentParam {
    return {
        a: 1.5,
        b: 0.7,
        lowerLimit: 10,
        lowerLimitPoints: 10,
        upperLimit: 100,
        upperLimitPoints: 100,
        badStageLimit: 30,
        weakStageLimit: 40,
        middleStageLimit: 50,
        goodStageLimit: 70,
        veryGoodStageLimit: 100,
        minScale: 10,
        scale39: 30,
        scale49: 50,
        scale59: 70,
        maxScale: 100,
    };
}
