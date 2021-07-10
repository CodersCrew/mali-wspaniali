import { resultColors } from '../../colors';
import { AssessmentParam } from '../../graphql/types';
import { countInvertedPoints, countPoints } from '../../pages/InstructorResultCreatorPage/countPoints';

interface Calculation {
    color: string;
    lightColor: string;
    key: string;
    nextKey: string | null;
    maxValueInPoints: number;
}

const testResults = {
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

export function getResultColorAndLabel(valueInPoints: number, param: AssessmentParam, name: string): Calculation {
    const count = name === 'run' || name === 'pendelumRun' ? countPoints : countInvertedPoints;

    let result: Partial<Calculation>;

    if (valueInPoints < count(param?.scale39 || 0, param)) {
        result = testResults.bad;
    } else if (valueInPoints < count(param?.scale49 || 0, param)) {
        result = testResults.weak;
    } else if (valueInPoints < count(param?.scale59 || 0, param)) {
        result = testResults.good;
    } else {
        result = testResults.veryGood;
    }

    const maxValueInPoints = Math.max(count(param.maxScale, param), count(param.minScale, param));

    return { ...result, maxValueInPoints } as Calculation;
}
