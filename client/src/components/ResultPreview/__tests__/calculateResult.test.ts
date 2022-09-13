import { resultColors } from '@app/colors';
import { AssessmentParam } from '@app/graphql/types';

import { getResultColorAndLabel } from '../calculateResult';

describe('calculateResult', () => {
    describe('for increasing dependency', () => {
        const matrix = createThrowAssessmentParam();

        describe('for low results', () => {
            it('places a result within 39 percentile', () => {
                const result39 = getResultColorAndLabel(70, matrix, 'throw');

                expect(result39.key).toBe('scale39');
                expect(result39.color).toBe(resultColors.red);
                expect(result39.nextKey).toBe('scale49');
                expect(result39.valueInPoints).toBe(25.2949);
                expect(result39.scale39InPoints).toBe(40.8619);
            });
        });

        describe('for weak results', () => {
            it('places a result within 39 and 49 percentile', () => {
                const result39_49 = getResultColorAndLabel(100, matrix, 'throw');

                expect(result39_49.key).toBe('scale49');
                expect(result39_49.color).toBe(resultColors.yellow);
                expect(result39_49.nextKey).toBe('scale59');
                expect(result39_49.valueInPoints).toBe(40.8619);
                expect(result39_49.scale39InPoints).toBe(40.8619);
                expect(result39_49.scale49InPoints).toBe(51.2399);
            });
        });

        describe('for good results', () => {
            it('places a result within 49 and 59 percentile', () => {
                const result49_59 = getResultColorAndLabel(125, matrix, 'throw');

                expect(result49_59.key).toBe('scale59');
                expect(result49_59.color).toBe(resultColors.green);
                expect(result49_59.nextKey).toBe('maxScale');
                expect(result49_59.valueInPoints).toBe(53.834399999999995);
                expect(result49_59.scale49InPoints).toBe(51.2399);
                expect(result49_59.scale59InPoints).toBe(56.428900000000006);
            });
        });

        describe('for very good results', () => {
            it('places a result within 59 and 100 percentile', () => {
                const result59_max = getResultColorAndLabel(135, matrix, 'throw');

                expect(result59_max.key).toBe('maxScale');
                expect(result59_max.color).toBe(resultColors.green);
                expect(result59_max.nextKey).toBe(null);
                expect(result59_max.valueInPoints).toBe(59.0234);
                expect(result59_max.scale59InPoints).toBe(56.428900000000006);
                expect(result59_max.maxScaleInPoints).toBe(82);
            });
        });
    });

    describe('for decreasing dependency', () => {
        const matrix = createRunAssessmentParam();

        describe('for low results', () => {
            it('places a result within 39 percentile', () => {
                const result39 = getResultColorAndLabel(10, matrix, 'run');

                expect(result39.key).toBe('scale39');
                expect(result39.color).toBe(resultColors.red);
                expect(result39.nextKey).toBe('scale49');
                expect(result39.valueInPoints).toBe(24);
                expect(result39.scale39InPoints).toBe(38.7513);
            });
        });

        describe('for weak results', () => {
            it('places a result within 39 and 49 percentile', () => {
                const result39_49 = getResultColorAndLabel(8, matrix, 'run');

                expect(result39_49.key).toBe('scale49');
                expect(result39_49.color).toBe(resultColors.yellow);
                expect(result39_49.nextKey).toBe('scale59');
                expect(result39_49.valueInPoints).toBe(40.199299999999994);
                expect(result39_49.scale39InPoints).toBe(38.7513);
                expect(result39_49.scale49InPoints).toBe(48.88729999999998);
            });
        });

        describe('for good results', () => {
            it('places a result within 49 and 59 percentile', () => {
                const result49_59 = getResultColorAndLabel(7, matrix, 'run');

                expect(result49_59.key).toBe('scale59');
                expect(result49_59.color).toBe(resultColors.green);
                expect(result49_59.nextKey).toBe('maxScale');
                expect(result49_59.valueInPoints).toBe(54.6793);
                expect(result49_59.scale49InPoints).toBe(48.88729999999998);
                expect(result49_59.scale59InPoints).toBe(59.02329999999999);
            });
        });

        describe('for very good results', () => {
            it('places a result within 59 and 100 percentile', () => {
                const result59_max = getResultColorAndLabel(6, matrix, 'run');

                expect(result59_max.key).toBe('maxScale');
                expect(result59_max.color).toBe(resultColors.green);
                expect(result59_max.nextKey).toBe(null);
                expect(result59_max.valueInPoints).toBe(69.1593);
                expect(result59_max.scale59InPoints).toBe(59.02329999999999);
                expect(result59_max.maxScaleInPoints).toBe(74);
            });
        });
    });
});

function createRunAssessmentParam(): AssessmentParam {
    return {
        a: -14.48,
        b: 156.0393,
        lowerLimit: 5.8,
        lowerLimitPoints: 74,
        upperLimit: 9.1,
        upperLimitPoints: 24,
        badStageLimit: 9.1,
        weakStageLimit: 8.1,
        middleStageLimit: 7.4,
        goodStageLimit: 6.7,
        veryGoodStageLimit: 3.7,
        minScale: 9.1,
        scale39: 8.1,
        scale49: 7.4,
        scale59: 6.7,
        maxScale: 3.7,
    };
}

function createThrowAssessmentParam(options: Record<string, number | null> = {}): AssessmentParam {
    return {
        a: 0.5189,
        b: -11.0281,
        lowerLimit: 70,
        lowerLimitPoints: 25,
        upperLimit: 180,
        upperLimitPoints: 82,
        badStageLimit: 70,
        weakStageLimit: 100,
        middleStageLimit: 120,
        goodStageLimit: 130,
        veryGoodStageLimit: 500,
        minScale: 70,
        scale39: 100,
        scale49: 120,
        scale59: 130,
        maxScale: 500,
        ...options,
    };
}
