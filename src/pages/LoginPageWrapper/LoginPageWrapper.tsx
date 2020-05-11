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
                <img className={classes.logo} src={Logo} alt="Mali Wspaniali Logo" />
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

        '@media (max-width:767px)': {
            flexDirection: 'column',
            padding: 0,
        },
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '2 0 0',
        flexDirection: 'column',

        '@media (max-width:767px)': {
            flex: '0',
            marginTop: '15px',
        },
    },
    formContainer: {
        backgroundColor,
        minHeight: 'calc(100vh - 20px)',
        height: '100%',
        borderRadius: '10px',
        flex: '1 0 0',

        '@media (max-width:767px)': {
            minHeight: 'auto',
            borderRadius: '10px 10px 0 0',
        },
    },
    welcomeText: {
        marginTop: '50px',
        width: '480px',
        color: backgroundColor,
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '44px',
        textAlign: 'center',
        textTransform: 'uppercase',

        '@media (max-width:767px)': {
            margin: '15px 0 30px 0',
            width: '280px',
            fontSize: '21px',
            lineHeight: '26px',
        },
    },
    logo: {
        '@media (max-width:767px)': {
            maxWidth: '200px',
        },
    },
});
