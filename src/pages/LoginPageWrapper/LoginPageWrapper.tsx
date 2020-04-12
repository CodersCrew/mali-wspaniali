import React from 'react';
import { makeStyles } from '@material-ui/core';
import { mainColor, backgroundColor } from '../../colors';
import Logo from '../../assets/MALWSP_logo.png';

export const LoginPageWrapper: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <div className={classes.logoContainer}>
                <img src={Logo} alt="Mali Wspaniali Logo"></img>
            </div>
            <div className={classes.formContainer}>{children}</div>
        </div>
    );
};

const useStyles = makeStyles({
    background: {
        backgroundColor: mainColor,
        minHeight: '100vh',
        height: '100%',
        padding: '10px',
        display: 'flex',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '2 0 0',
    },
    formContainer: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        flex: '1 0 0'
    },
});
