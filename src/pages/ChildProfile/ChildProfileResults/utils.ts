import moment from 'moment';
import { Result } from '../../../firebase/types';

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
