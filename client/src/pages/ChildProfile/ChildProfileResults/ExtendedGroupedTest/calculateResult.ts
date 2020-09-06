import { resultColors } from '../../../../colors';

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
