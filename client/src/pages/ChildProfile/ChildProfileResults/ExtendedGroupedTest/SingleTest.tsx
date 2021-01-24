import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { gray } from '../../../../colors';
import { TestResult } from '../../../../graphql/types';

import { TestSummary } from './TestSummary';
import { TestDetails } from './TestDetails';


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
