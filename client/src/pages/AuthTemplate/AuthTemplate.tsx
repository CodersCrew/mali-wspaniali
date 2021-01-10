import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { mainColor, backgroundColor } from '../../colors';
import Logo from '../../assets/MALWSP_logo.png';
import Maker from '../../assets/authTemplateLogos/maker/maker.png';

type AuthTemplateType = 'login' | 'register';

export const AuthTemplate: React.FC<{ type: AuthTemplateType }> = ({ children, type }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.background}>
            <div className={classes.logoContainer}>
                <div className={classes.logoInnerContainer}>
                    <img className={classes.logo} src={Logo} alt="Mali Wspaniali Logo" />
                    <div className={classes.welcomeText}>{t('login-wrapper.welcome-text')}</div>
                    {type === 'register' && <p className={classes.subheading}>{t('login-wrapper.subheading')}</p>}
                </div>
                <div className={classes.partnersContainer}>
                    <div className={classes.maker}>
                        <div className={classes.partnersHeader}>
                            <Typography variant="subtitle1">Stworzone przez:</Typography>{' '}
                        </div>
                        <div className={classes.partnersLogos}>
                            <img src={Maker} alt="maker_logo" className={classes.makerPartnersLogo} />
                        </div>
                    </div>
                    <div className={classes.partners}>
                        <div className={classes.partnersHeader}>
                            <Typography variant="subtitle1">Partnerzy strategiczni:</Typography>{' '}
                        </div>
                        <div className={classes.partnersLogos}>
                            <Typography variant="subtitle1">Logos</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.formContainer}>{children}</div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        background: {
            backgroundColor: mainColor,
            minHeight: '100vh',
            height: '100%',
            display: 'flex',

            [theme.breakpoints.down('sm')]: {
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
            [theme.breakpoints.down('sm')]: {
                flex: '0',
                marginTop: '15px',
            },
        },
        logoInnerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
        },
        formContainer: {
            backgroundColor,
            minHeight: '100vh',
            height: '100%',
            flex: '3 0 0',

            [theme.breakpoints.down('sm')]: {
                minHeight: 'auto',
            },
        },
        welcomeText: {
            marginTop: '40px',
            width: '400px',
            color: theme.palette.text.primary,
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: theme.typography.fontWeightMedium,
            fontSize: '34px',
            lineHeight: '41.45px',
            textAlign: 'center',

            [theme.breakpoints.down('sm')]: {
                margin: '15px 0 30px 0',
                width: '280px',
                fontSize: '21px',
                lineHeight: '26px',
            },
        },
        subheading: {
            marginTop: '20px',
            fontSize: '21px',
            lineHeight: '26px',
            color: backgroundColor,

            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        logo: {
            width: '327.04px',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '200px',
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
