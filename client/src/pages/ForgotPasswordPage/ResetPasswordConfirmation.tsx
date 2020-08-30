import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { white } from '../../colors';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';

const tPrefix = 'forgot-password-page';

export const ResetPasswordConfirmation = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.subtitle}>
                {t(`${tPrefix}.email-sent`)}
            </Typography>
            <Typography className={classes.subtitle}>
                {t(`${tPrefix}.when-received`)}
            </Typography>
            <ButtonSecondary
                variant="contained"
                href="/login"
                className={classes.backToLoginButton}
                innerText={t('forgot-password-page.back-to-login')}
            />
        </>
    );
};

const useStyles = makeStyles({
    loginLinkWrapper: {
        marginBottom: '20px',
        marginTop: '40px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: white,
        textDecoration: 'none',
    },
    subtitle: {
        textAlign: 'center',
    },
    backToLoginButton: {
        marginBottom: '20px',
        marginTop: '40px',
    },
});
