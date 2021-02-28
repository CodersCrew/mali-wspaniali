import { makeStyles } from '@material-ui/styles';
import { TestSummary } from './TestSummary';
import { gray } from '../../../../colors';
import { TestDetails } from './TestDetails';
import { TestResult } from '../../../../graphql/types';

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

const useStyles = makeStyles({
    container: {
        display: 'flex',
        padding: '10px 0',
        borderBottom: `1px solid ${gray}`,
    },
});
