import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { mainColor, backgroundColor } from '../../colors';
import Logo from '../../assets/MALWSP_logo.png';

export const LoginPageWrapper: React.FC = ({ children }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.background}>
            <div className={classes.logoContainer}>
                <img src={Logo} alt="Mali Wspaniali Logo"></img>
                <div className={classes.welcomeText}>{t('login-wrapper.welcome-text')}</div>
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
        flexDirection: 'column',
    },
    formContainer: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        flex: '1 0 0'
    },
    welcomeText: {
        marginTop: '50px',
        color: backgroundColor,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});
