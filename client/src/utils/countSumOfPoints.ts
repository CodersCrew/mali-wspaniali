import { TestResult } from '../graphql/types';

export function countSumOfPoints(result: TestResult['test']) {
    const { agilityPoints, powerPoints, speedPoints, strengthPoints } = result;

    const sumOfPoints = agilityPoints + powerPoints + speedPoints + strengthPoints;

    return sumOfPoints;
}
