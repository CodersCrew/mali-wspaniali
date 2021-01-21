import React from 'react';
import { makeStyles, createStyles, Theme, Typography, AppBar, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { mainColor, backgroundColor } from '../../colors';
import Logo from '../../assets/MALWSP_logo.png';
import Maker from '../../assets/authTemplateLogos/maker/maker.png';
import { useIsDevice } from '../../queries/useBreakpoints';

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
                        {type === 'login' && (
                            <div className={classes.partnersContainer}>
                                <div className={classes.maker}>
                                    <div className={classes.partnersHeader}>
                                        <Typography variant="subtitle1">{t('login-wrapper.made-by')}</Typography>
                                    </div>
                                    <div className={classes.partnersLogos}>
                                        <img src={Maker} alt="maker_logo" className={classes.makerPartnersLogo} />
                                    </div>
                                </div>
                                <div className={classes.partners}>
                                    <div className={classes.partnersHeader}>
                                        <Typography variant="subtitle1">{t('login-wrapper.partners')}</Typography>
                                    </div>
                                    <div className={classes.partnersLogos}>
                                        <Typography variant="subtitle1">Logos</Typography>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={classes.formContainer}>{children}</div>
                </div>
            ) : (
                <>
                    <Box zIndex="appBar">
                        <AppBar
                            className={classes.appBar}
                            position="fixed"
                            classes={{
                                root: clsx({
                                    [classes.containerMobile]: !isDesktop,
                                }),
                            }}
                        >
                            <img className={classes.logo} src={Logo} alt="Mali Wspaniali Logo" />
                        </AppBar>
                    </Box>{' '}
                    <div className={classes.formContainer}>{children}</div>
                </>
            )}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerMobile: {
            borderBottom: `1px solid ${theme.palette.primary.main}`,
        },
        appBar: {
            height: 64,
        },

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
            justifyContent: 'end',
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
        formContainer: {
            backgroundColor,
            minHeight: '100vh',
            height: '100%',
            flex: '3 0 0',

            [theme.breakpoints.down('md')]: {
                minHeight: 'auto',
            },
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
        subheading: {
            marginTop: theme.spacing(2.5),
            fontSize: '21px',
            lineHeight: 26,
            color: backgroundColor,

            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        logo: {
            width: '327.04',
            [theme.breakpoints.down('md')]: {
                width: 109,
                margin: 'auto',
            },
        },
        partnersContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
        },
        partnersHeader: {
            marginBottom: theme.spacing(3),
        },
        partnersLogos: {
            height: 70,
        },
        maker: {
            width: 176,
            marginRight: theme.spacing(3),
        },
        partners: {
            width: '100%',
        },
        makerPartnersLogo: {
            width: 170,
            height: 70,
            borderRadius: 4,
        },
    }),
);
