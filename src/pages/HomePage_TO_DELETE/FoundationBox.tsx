import React from 'react';
import { makeStyles } from '@material-ui/core/';
import { textColor, cardBackgroundColor } from '../../colors';

export const FoundationBox = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.FoundationBox}>
                <div className={classes.FoundationPicture}></div>
                <p className={classes.FoundationTitle}>Foundation Box Title</p>
                <p className={classes.FoundationText}>
                    Tutaj będzie krótkie wprowadzenie od Fundacji. Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the.Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the. Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum is simply dummy text of the printing and
                </p>
            </div>
        </>
    );
};

const useStyles = makeStyles({
    FoundationBox: {
        marginTop: '30px',
        borderRadius: '4px',
        width: '904px',
        height: '163px',
        boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.15)',
        backgroundColor: cardBackgroundColor,
        color: textColor,
    },
    FoundationPicture: {
        width: '102px',
        height: '123px',
        border: 'ridge',
        marginTop: '20px',
        marginLeft: '15px',
    },
    FoundationTitle: {
        position: 'absolute',
        fontFamily: 'Montserrat, sans-serif',
        top: '190px',
        left: '504px',
        fontSize: '15px',
        color: textColor,
        width: '285px',
        height: '18px',
        fontWeight: 'bold',
        margin: 0,
    },
    FoundationText: {
        position: 'absolute',
        top: '214px',
        left: '504px',
        width: '747px',
        height: '75px',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '15px',
        fontWeight: 'normal',
        margin: 0,
    },
});
