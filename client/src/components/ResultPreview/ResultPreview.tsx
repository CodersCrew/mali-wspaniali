import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { AssessmentResult, Child } from '../../graphql/types';
import { ResultComparison } from './ResultComparison';
import { TestDetails } from './TestDetails';
import { TestSummary } from './TestSummary';

export function ResultPreview(props: { result: AssessmentResult; child: Child }) {
    return (
        <>
            <SingleTest {...props} prefix="first" />
            <SingleTest {...props} prefix="last" />
            <ResultComparison {...props} params={props.result.currentParams} />
        </>
    );
}

interface SingleTestProps {
    result: AssessmentResult;
    child: Child;
    prefix: string;
}

function SingleTest(props: SingleTestProps) {
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
