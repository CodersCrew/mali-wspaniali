import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { ResultDetailsLeft } from './ResultDetailsLeft';
import { gray } from '../../../colors';
import { ResultDetailsProps } from './types';

export const ResultDetails = ({ result, previousResult }: ResultDetailsProps) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <ResultDetailsLeft result={result} previousResult={previousResult} />
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        display: 'flex',
        padding: '10px 0',
        borderBottom: `1px solid ${gray}`,
    },
});
