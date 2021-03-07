import React from 'react';
import { makeStyles, createStyles, Theme, AppBar, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { mainColor, backgroundColor } from '../../colors';
import Logo from '../../assets/MALWSP_logo.png';
import { useIsDevice } from '../../queries/useBreakpoints';
import { LanguageSelector } from '../RegistrationPage/RegistrationForm/LanguageSelector';

import { PartnerLogotypeContainer } from './PartnerLogotypeContainer';

type AuthTemplateType = 'login' | 'register';

export const AuthTemplate: React.FC<{ type: AuthTemplateType }> = ({ children, type }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { isDesktop } = useIsDevice();

    return (
        <>
            {isDesktop ? (
                <div className={classes.background}>
                    <div className={classes.logoContainer}>
                        <div className={classes.logoInnerContainer}>
                            <img className={classes.logo} src={Logo} alt="Mali Wspaniali Logo" />
                            <div className={classes.welcomeText}>{t('login-wrapper.welcome-text')}</div>
                        </div>
                        {type === 'login' && <PartnerLogotypeContainer />}
                    </div>
                    <div className={classes.formContainer}>{children}</div>
                </div>
            ) : (
                <>
                    <Box zIndex="appBar">
                        <AppBar className={classes.appBar} position="fixed">
                            <div className={classes.appBarLanguageSelector} />
                            <img className={classes.logo} src={Logo} alt="Mali Wspaniali Logo" />
                            <div className={classes.appBarLanguageSelector}>
                                <LanguageSelector />
                            </div>
                        </AppBar>
                    </Box>
                    <div className={classes.formContainer}>{children}</div>
                </>
            )}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            backgroundColor: mainColor,
            minHeight: '100vh',
            height: '100%',
            display: 'flex',

            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                padding: 0,
            },
        },
        logoContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: '4 0 0',
            flexDirection: 'column',
            padding: theme.spacing(3),
            [theme.breakpoints.down('md')]: {
                flex: '0',
                marginTop: 15,
            },
        },
        logoInnerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        logo: {
            width: '327.04',
            [theme.breakpoints.down('md')]: {
                width: 109,
                margin: 'auto',
        },
        welcomeText: {
            marginTop: theme.spacing(5),
            width: 400,
            color: theme.palette.text.primary,
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: '34px',
            lineHeight: '41.45px',
            textAlign: 'center',

            [theme.breakpoints.down('md')]: {
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(4),
                width: 280,
                fontSize: '21px',
                lineHeight: 26,
            },
        },
/*
            formContainer: {
                backgroundColor,
                flex: '3 0 0',
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.down('sm')]: {
                    minHeight: 'auto',
                },
*/
        formContainer: {
            backgroundColor,
            minHeight: '100vh',
            height: '100%',
            flex: '3 0 0',

            [theme.breakpoints.down('md')]: {
                minHeight: 'auto',
            },
        },
        appBar: {
            height: 64,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
        appBarLanguageSelector: {
            height: 24,
            width: 24,
            marginRight: theme.spacing(3),
        },
    }),
);
