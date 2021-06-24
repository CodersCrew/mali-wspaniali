import { makeStyles } from '@material-ui/styles';
import { createStyles, Theme } from '@material-ui/core';
import { TestSummary } from './TestSummary';
import { TestDetails } from './TestDetails';
import { AssessmentResult } from '../../../../graphql/types';

interface Props {
    result: AssessmentResult;
    title: string;
    description: string;
    points: number;
    prefix: string;
}

export const SingleTest = (props: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TestSummary {...props} />
            <TestDetails {...props} />
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
                maxWidth: '100vw',
            },
        },
    }),
);
