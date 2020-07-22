import React from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { white } from '../../colors';

const t_prefix = 'forgot-password-page';

export const PostsentPasswordPage = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.subtitle}>{t(`${t_prefix}.email-sent`)}</Typography>
            <Typography className={classes.subtitle}>{t(`${t_prefix}.when-received`)}</Typography>
            <Button variant="contained" color="secondary" className={classes.loginLinkWrapper} href="/login">
                {t(`${t_prefix}.back-to-login`)}
            </Button>
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
});
