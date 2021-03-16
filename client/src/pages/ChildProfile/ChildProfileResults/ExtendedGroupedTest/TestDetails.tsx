import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme, Typography } from '@material-ui/core';
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
            <Typography variant="subtitle2">
                {result.test.testPeriod === 'START'
                    ? t('child-profile.initial-test-title')
                    : t('child-profile.final-test-title')}
                :
            </Typography>
            <div className={classes.chartsWrapper}>
                {TESTS.map((test) => (
                    <Measurement result={result} test={test} isDetailsButtonVisible={true} />
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

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            width: '100%',
        },
        chartsWrapper: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
    }),
);
