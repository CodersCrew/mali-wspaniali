import moment from '../../../localizedMoment';
import { Result } from '../../../firebase/types';
import { resultColors } from '../../../colors';

interface GroupedResults {
    [schoolYear: string]: Result[];
}

const getPotentialResults = (yearOfBirth: number) => {
    const currentYear = new Date().getFullYear();
    const startYear = yearOfBirth + 3;
    const endYear = Math.min(startYear + 4, currentYear) + 1;
    const numberOfResults = endYear - startYear;
    const array = Array.from({ length: numberOfResults }, (item, index) => startYear + index);

    return array.reduce(
        (result, item) => {
            return {
                ...result,
                [item]: [],
            };
        },
        {} as GroupedResults,
    );
};

export const getGroupedResults = (results: Result[]) => {
    const potentialResults = getPotentialResults(2005);
    const realResults = results.reduce(
        (accumulator, currentResult) => {
            const currentSchoolYearResults = accumulator[currentResult.schoolYearStart];

            if (currentSchoolYearResults) {
                currentSchoolYearResults.push(currentResult);

                return accumulator;
            }

            return {
                ...accumulator,
                [currentResult.schoolYearStart]: [currentResult],
            };
        },
        {} as GroupedResults,
    );

    return {
        ...potentialResults,
        ...realResults,
    };
};

export const getMaxDate = (dates: Date[]) => {
    const momentDates = dates.map(date => moment(date));

    return dates.length > 0 ? moment.max(momentDates) : null;
};

const testResults = {
    low: {
        color: resultColors.red,
        lightColor: resultColors.lightRed,
        translationKey: 'low',
    },
    medium: {
        color: resultColors.yellow,
        lightColor: resultColors.lightYellow,
        translationKey: 'medium',
    },
    high: {
        color: resultColors.green,
        lightColor: resultColors.lightGreen,
        translationKey: 'high',
    },
};

export const getResultColorAndLabel = (value: number, maxValue: number) => {
    const percentageValue = (value / maxValue) * 100;
    if (percentageValue < 67) return testResults.low;
    if (percentageValue < 83) return testResults.medium;

    return testResults.high;
};

export const getDifferenceLabel = (firstValue: number, lastValue: number) => {
    if (firstValue > lastValue) return 'worse';
    if (lastValue > firstValue) return 'better';

    return 'same';
};

export const getSchoolYearLabel = (schoolYearStart: number) => `${schoolYearStart}/${schoolYearStart + 1}`;
