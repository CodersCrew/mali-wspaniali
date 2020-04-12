import React from 'react';
import { makeStyles } from '@material-ui/core';
import { mainColor, backgroundColor } from '../../colors';

export const AppWrapper: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={ classes.background }>
            <div className={ classes.container }>{ children }</div>
        </div>
    );
};

const useStyles = makeStyles({
    background: {
        backgroundColor: mainColor,
        minHeight: '100vh',
        height: '100%',
        padding: '10px',
    },
    container: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
    },

});
