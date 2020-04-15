import React from 'react';
import { makeStyles } from '@material-ui/core/';
import { mainColor } from '../../colors';

export const FoundationBox = () =>
{
    const classes = useStyles();

    return (
        <>
            <div className={ classes.FoundationBox }></div>
            <p className={ classes.FoundationText }>{ }</p>
        </>
    );
};

const useStyles = makeStyles({
    FoundationBox: {
        borderRadius: '4px',
    },
    FoundationText: {
        fontSize: '15px',
        color: mainColor
    },
});