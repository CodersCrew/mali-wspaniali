import moment from 'moment';
import { Result } from '../../../firebase/types';
import { resultColors } from '../../../colors';

interface GroupedResults {
    [schoolYear: string]: Result[];
}

export const getGroupedResults = (results: Result[]) => {
    return results.reduce(
        (accumulator, currentResult) => {
            const currentSchoolYearResults = accumulator[currentResult.schoolYear];

            if (currentSchoolYearResults) {
                currentSchoolYearResults.push(currentResult);

                return accumulator;
            }

            return {
                ...accumulator,
                [currentResult.schoolYear]: [currentResult],
            };
        },
        {} as GroupedResults,
    );
};

export const getMaxDate = (dates: Date[]) => {
    const momentDates = dates.map(date => moment(date));

    return moment.max(momentDates);
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

export const getResultColorAndLabel = (value: number) => {
    if (value < 160) return testResults.low;
    if (value < 200) return testResults.medium;

    return testResults.high;
};
