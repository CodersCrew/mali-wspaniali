import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { ButtonSecondary } from '../../../components/Button';
import { FormControlOldPasswordFormik } from './ChangePasswordPanelFormControlsFormik/FormControlOldPasswordFormik';

export const ChangePasswordPanelFormik = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            oldPassword: 'stare hasło',
            oldPasswordError: false,
        },
        onSubmit: values => {
            console.log(values);
        },
    });
    console.log(formik);

    return (
        <Grid container>
            <Grid container item xs={12} spacing={10}>
                <Grid item xs={6}>
                    <FormControlOldPasswordFormik
                        name="old-password"
                        value={formik.values.oldPassword}
                        oldPasswordError={false}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={'subtitle2'} className={classes.problems}>
                        {t('settings-page.change-password-problems')}
                    </Typography>
                    <Typography variant={'body2'} className={classes.problems}>
                        {t('settings-page.change-password-problems-hint')}
                    </Typography>
                    <ButtonSecondary variant={'contained'} className={classes.problems}>
                        <Typography variant={'button'}>
                            {t('settings-page.parent.delete-account.deletion-button')}
                        </Typography>
                    </ButtonSecondary>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        problems: {
            marginBottom: theme.spacing(2),
        },
    }),
);
