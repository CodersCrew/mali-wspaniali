import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonSecondary } from '../../../components/Button';

export const AccountDeletionPanel = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Typography>
            <Typography className={classes.message}>
                {t('settings-page.parent.delete-account.deletion-not-allowed')}
            </Typography>
            <Typography variant={'subtitle2'} className={classes.hint}>
                {t('settings-page.parent.delete-account.deletion-hint')}
            </Typography>
            <ButtonSecondary variant={'contained'}>
                <Typography variant={'button'}>{t('settings-page.parent.delete-account.deletion-button')}</Typography>
            </ButtonSecondary>
        </Typography>
    );
};

const useStyles = makeStyles({
    message: {
        marginBottom: '16px',
    },
    hint: {
        color: 'rgba(0,0,0,0.54)',
        marginBottom: '16px',
    },
});
