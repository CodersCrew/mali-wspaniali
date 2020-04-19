import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { ChildToDisplay } from './types';

export const ChildDisplay: FC<ChildToDisplay> = ({ firstname, avatar }) => {
    const classes = useStyles();

    return (
        <div className={classes.childRectangle}>
            <img src={avatar} alt="maliwspaniali-child-img" className={classes.childAva} />
            <div className={classes.childName}>{firstname}</div>
        </div>
    );
};

const useStyles = makeStyles({
    childRectangle: {
        borderRadius: '8px',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
        backgroundColor: '#ffffff',
        height: '161px',
        marginRight: '34.9px',
    },
    childAva: {
        width: '122px',
        height: '122.3px',
    },
    childName: {
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#1d1d1b',
        textAlign: 'center',
    },
});
