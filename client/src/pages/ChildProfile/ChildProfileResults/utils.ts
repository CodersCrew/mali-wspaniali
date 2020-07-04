import { Moment } from 'moment';
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
    const years = Array.from({ length: numberOfResults }, (item, index) => startYear + index);

    return years.reduce(
        (result, year) => {
            return {
                ...result,
                [year]: [],
            };
        },
        {} as GroupedResults,
    );
};

export const getGroupedResults = (results: Result[], birthYear: number) => {
    const potentialResults = getPotentialResults(birthYear);
    const realResults = results.reduce(
            (accumulator, currentResult) => {
                const currentSchoolYearResults = accumulator[currentResult.schoolYearStart];

                if (currentSchoolYearResults) {
                    return {
                        ...accumulator,
                        [currentResult.schoolYearStart]: [...currentSchoolYearResults, currentResult]
                    };
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

export type GetMaxDate = (dates: Date[]) => Moment | null

export const getMaxDate: GetMaxDate = dates => {
    const momentDates = dates.map(date => moment(date));

    return dates.length > 0 ? moment.max(momentDates) : null;
};

const testResults = {
    bad: {
        color: resultColors.red,
        lightColor: resultColors.lightRed,
        key: 'bad',
    },
    medium: {
        color: resultColors.yellow,
        lightColor: resultColors.lightYellow,
        key: 'medium',
    },
    good: {
        color: resultColors.green,
        lightColor: resultColors.lightGreen,
        key: 'good',
    },
    veryGood: {
        color: resultColors.green,
        lightColor: resultColors.lightGreen,
        key: 'very-good',
    },
};

export const getResultColorAndLabel = (value: number, maxValue: number) => {
    const percentageValue = (value / maxValue) * 100;
    if (percentageValue < 67) return testResults.bad;
    if (percentageValue < 83) return testResults.medium;
    if (percentageValue < 100) return testResults.good;

    return testResults.veryGood;
};

export const getDifferenceKey = (firstValue: number, lastValue: number) => {
    if (firstValue > lastValue) return 'regress';
    if (lastValue > firstValue) return 'progress';

    return 'constant';
};

export const getSchoolYearLabel = (schoolYearStart: number) => `${schoolYearStart}/${schoolYearStart + 1}`;
