import {makeStyles} from '@material-ui/styles';
import {createStyles, Theme} from '@material-ui/core';
import {TestSummary} from './TestSummary';
import {TestDetails} from './TestDetails';
import {TestResult} from '../../../../graphql/types';

interface Props {
    result: TestResult;
}

export const SingleTest = ({ result }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TestSummary result={result} />
            <TestDetails result={result} />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            padding: `${theme.spacing(2)}px 0`,
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100vw'
            }
        },
    })
);