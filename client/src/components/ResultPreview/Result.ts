import { AssessmentParam, AssessmentResult } from '@app/graphql/types';

import { Calculation, getResultColorAndLabel, testResults } from './calculateResult';

export class Result {
    constructor(
        private props: {
            result: AssessmentResult;
            unit?: string;
            name?: string;
            prefix?: string;
            translationKey?: string;
        },
    ) {}

    get unit() {
        return this.props.unit;
    }

    get result() {
        return this.props.result;
    }

    get name() {
        return this.props.name;
    }

    get translationKey() {
        return this.props.translationKey;
    }

    getNormalizedName(name?: string) {
        const paramName = this.props.result.currentParams;

        return lowercaseFirstLetter(name || this.props.name || '') as keyof typeof paramName;
    }

    getParam(name?: 'run' | 'pendelumRun' | 'jump' | 'throw'): AssessmentParam {
        return this.props.result.currentParams[name || this.getNormalizedName()]!;
    }

    getValue(name?: string): number {
        const resultName = this.props.result;

        return (
            (this.props.result[
                `${this.props.prefix}Measurement${name || this.props.name}Result` as keyof typeof resultName
            ] as number) || 0
        );
    }

    getChartValue() {
        const name = this.getNormalizedName();

        if (name === 'run' || name === 'pendelumRun') {
            return this.getMaxValue() - this.getValue();
        }

        return this.getMaxValue() - (this.getMaxValue() - this.getValue());
    }

    getMaxValue() {
        return Math.max(this.getParam().maxScale, this.getParam().minScale);
    }

    getMinValue(): number {
        return Math.min(this.getParam().maxScale, this.getParam().minScale);
    }

    getChartDetails() {
        return getResultColorAndLabel(this.getValue() as number, this.getParam()!, this.getNormalizedName());
    }

    getChildId() {
        return this.result.child._id;
    }

    getChildName() {
        return this.result.child.firstname || '';
    }

    getChildAge() {
        return this.result.child.age || 0;
    }

    getSex() {
        return this.result.child.sex;
    }

    isLastMeasurementFinished() {
        return this.props.result.assessment.lastMeasurementStatus === 'done';
    }

    countCategoryPoints(name: keyof AssessmentParam) {
        const categories = Object.entries(this.result.currentParams);

        return categories.reduce((acc, [, category]) => {
            const { a, b } = category;

            const value = category[name] || 0;

            if (a && b) {
                return Math.round(acc + a * value + b);
            }

            return acc;
        }, 0);
    }

    countSumOfPoints() {
        const {
            firstMeasurementJumpResult,
            firstMeasurementPendelumRunResult,
            firstMeasurementRunResult,
            firstMeasurementThrowResult,
            lastMeasurementJumpResult,
            lastMeasurementPendelumRunResult,
            lastMeasurementRunResult,
            lastMeasurementThrowResult,
        } = this.result;

        const sumOfPointsFirstMeasurement =
            firstMeasurementJumpResult +
            firstMeasurementPendelumRunResult +
            firstMeasurementRunResult +
            firstMeasurementThrowResult;
        const sumOfPointsLastMeasurement =
            lastMeasurementJumpResult +
            lastMeasurementPendelumRunResult +
            lastMeasurementRunResult +
            lastMeasurementThrowResult;

        return { sumOfPointsFirstMeasurement, sumOfPointsLastMeasurement };
    }

    getUniversalParam(): Partial<Calculation> {
        const results = (['Run', 'PendelumRun', 'Throw', 'Jump'] as const).map((name) => {
            return getResultColorAndLabel(
                this.getValue(name),
                this.getParam(this.getNormalizedName(name)),
                this.getNormalizedName(name),
            );
        });

        const sumValueInPoints = sumArray(results, 'valueInPoints');
        const sumScale39InPoints = sumArray(results, 'scale39InPoints');
        const sumScale49InPoints = sumArray(results, 'scale49InPoints');
        const sumScale59InPoints = sumArray(results, 'scale59InPoints');
        const sumMinScaleInPoints = sumArray(results, 'minScaleInPoints');
        const sumMaxScaleInPoints = sumArray(results, 'maxScaleInPoints');

        let result: Partial<Calculation>;

        if (sumValueInPoints < sumScale39InPoints) {
            result = testResults.bad;
        } else if (sumValueInPoints < sumScale49InPoints) {
            result = testResults.weak;
        } else if (sumValueInPoints < sumScale59InPoints) {
            result = testResults.good;
        } else {
            result = testResults.veryGood;
        }

        return {
            ...result,
            maxValueInPoints: sumMaxScaleInPoints,
            valueInPoints: sumValueInPoints,
            scale39InPoints: sumScale39InPoints,
            scale49InPoints: sumScale49InPoints,
            scale59InPoints: sumScale59InPoints,
            minScaleInPoints: sumMinScaleInPoints,
            maxScaleInPoints: sumMaxScaleInPoints,
        };
    }
}

function lowercaseFirstLetter(text: string) {
    return text.charAt(0).toLowerCase() + text.slice(1);
}

function sumArray(values: Calculation[], name: string) {
    return values.reduce((acc, v) => acc + (v[name as keyof Calculation] as number), 0);
}
