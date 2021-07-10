import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { ResultComparison } from './ResultComparison';
import { TestSummary } from './TestSummary';
import { useResult } from '../../operations/queries/Results/getResult';
import { ResultContext } from './context';
import { TestDetails } from './TestDetails';

export function ResultPreview(props: { resultId: string }) {
    const { result } = useResult(props.resultId);

    if (!result) return null;

    return (
        <ResultContext.Provider value={result}>
            <SingleTest prefix="first" />
            <SingleTest prefix="last" />
            <ResultComparison />
        </ResultContext.Provider>
    );
}

function SingleTest(props: { prefix: string }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TestSummary {...props} />
            <TestDetails {...props} />
        </div>
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
