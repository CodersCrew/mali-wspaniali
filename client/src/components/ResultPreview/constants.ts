export type resultKey =
    | 'strengthPoints'
    | 'strengthCentimeters'
    | 'powerPoints'
    | 'powerCentimeters'
    | 'speedPoints'
    | 'speedSeconds'
    | 'agilityPoints'
    | 'agilitySeconds';

export const TESTS = [
    {
        translationKey: 'strength',
        unitOfMeasure: 'cm',
        scaleFrom: 0,
        scaleTo: 80,
        pointsKey: 'strengthPoints',
        unitOfMeasureKey: 'strengthCentimeters',
        name: 'Throw',
    },
    {
        translationKey: 'power',
        unitOfMeasure: 'cm',
        scaleFrom: 0,
        scaleTo: 80,
        pointsKey: 'powerPoints',
        unitOfMeasureKey: 'powerCentimeters',
        name: 'Jump',
    },
    {
        translationKey: 'speed',
        unitOfMeasure: 's',
        scaleFrom: 80,
        scaleTo: 0,
        pointsKey: 'speedPoints',
        unitOfMeasureKey: 'speedSeconds',
        name: 'Run',
    },
    {
        translationKey: 'agility',
        unitOfMeasure: 's',
        scaleFrom: 80,
        scaleTo: 0,
        pointsKey: 'agilityPoints',
        unitOfMeasureKey: 'agilitySeconds',
        name: 'PendelumRun',
    },
];
