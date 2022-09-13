import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { ResultComparison } from './ResultComparison';
import { TestSummary } from './TestSummary';
import { useResult } from '../../operations/queries/Results/getResult';
import { ResultContext } from './context';
import { TestDetails } from './TestDetails';
import { ResultEmptyView } from './ResultEmptyView';

export function ResultPreview(props: { resultId: string }) {
    const { result } = useResult(props.resultId);

    if (!result) return <></>;

    if (!isFirstMeasurementDone() && !isLastMeasurementDone()) return <ResultEmptyView childId={result.child._id} />;

    return (
        <ResultContext.Provider value={result}>
            {isFirstMeasurementDone() && <SingleTest prefix="first" />}
            {isLastMeasurementDone() && <SingleTest prefix="last" />}
            {isFirstMeasurementDone() && isLastMeasurementDone() && <ResultComparison />}
        </ResultContext.Provider>
    );

    function isFirstMeasurementDone() {
        if (!result) return;

        return result.assessment.firstMeasurementStatus === 'done';
    }

    function isLastMeasurementDone() {
        if (!result) return;

        return result.assessment.lastMeasurementStatus === 'done';
    }
}

function SingleTest(props: { prefix: string }) {
    const classes = useStyles();

    return (
        <section className={classes.container}>
            <TestSummary {...props} />
            <TestDetails {...props} />
        </section>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            padding: `${theme.spacing(2)}px 0`,
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100vw',
            },
        },
    }),
);
