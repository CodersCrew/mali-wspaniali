import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { resultKey, TESTS } from './constants';
import { ResultDetailsProps } from './types';
import { SingleTestResult } from './SingleTestResult';
import { NoResultsBlock } from './NoResultsBlock';

export const ResultDetailsRight = ({ result, previousResult }: ResultDetailsProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const testsWithNoResult = TESTS.filter(test => !result[test.pointsKey as resultKey]);

    return (
        <div className={classes.wrapper}>
            <Typography variant="body2">
                {result.testPeriod === 'begin'
                    ? t('child-profile.initial-test-title')
                    : t('child-profile.final-test-title')}
                :
            </Typography>
            <div className={classes.chartsWrapper}>
                {TESTS.map(test => (
                    <SingleTestResult
                        valueInUnitOfMeasure={result[test.unitOfMeasureKey as resultKey]}
                        valueInPoints={result[test.pointsKey as resultKey]}
                        unitOfMeasure={test.unitOfMeasure}
                        scaleFrom={test.scaleFrom}
                        scaleTo={test.scaleTo}
                        translationKey={test.translationKey}
                        key={test.translationKey}
                        previousPoints={previousResult && previousResult[test.pointsKey as resultKey]}
                    />
                ))}
            </div>
            <div>
                {testsWithNoResult.map(test => (
                    <NoResultsBlock key={test.translationKey} translationKey={test.translationKey} />
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        margin: '0 30px',
    },
    chartsWrapper: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
});
