import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { resultKey, TESTS } from './constants';
import { Measurement } from './Measurement';
import { NoResultsBlock } from './emptyViews/NoResultsBlock';
import { TestResult } from '../../../../graphql/types';

export interface Props {
    result: TestResult;
}

export const TestDetails = ({ result }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    if (!result) return null;

    return (
        <div className={classes.wrapper}>
            <Typography variant="body2">
                {result.test.testPeriod === 'START'
                    ? t('child-profile.initial-test-title')
                    : t('child-profile.final-test-title')}
                :
            </Typography>
            <div className={classes.chartsWrapper}>
                {TESTS.map((test) => (
                    <Measurement
                        valueInUnitOfMeasure={result.test[test.unitOfMeasureKey as keyof TestResult['test']] as number}
                        valueInPoints={result.test[test.pointsKey as keyof TestResult['test']] as number}
                        unitOfMeasure={test.unitOfMeasure}
                        scaleFrom={test.scaleFrom}
                        scaleTo={test.scaleTo}
                        translationKey={test.translationKey}
                        key={test.translationKey}
                    />
                ))}
            </div>
            <div>{getTestUnavailableReason(result)}</div>
        </div>
    );
};

function getTestUnavailableReason(result: TestResult) {
    const testsWithNoResult = TESTS.filter((test) => !result.test[test.pointsKey as resultKey]);

    return testsWithNoResult.map((test) => (
        <NoResultsBlock key={test.translationKey} translationKey={test.translationKey} />
    ));
}

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
