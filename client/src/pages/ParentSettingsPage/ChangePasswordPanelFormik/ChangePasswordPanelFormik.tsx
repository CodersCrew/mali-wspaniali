import React, {useContext} from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {useMutation} from '@apollo/client';
import { ButtonSecondary } from '../../../components/Button';
import { FormControlOldPasswordFormik } from './ChangePasswordPanelFormControlsFormik/FormControlOldPasswordFormik';
import { openAlertDialog } from '../../../components/AlertDialog';
import {AUTHORIZE_USER} from '../../../graphql/userRepository';
import {UserContext} from '../../AppWrapper';

export const ChangePasswordPanelFormik = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            showOldPassword: false,
            oldPasswordError: false,
            oldPasswordHelperText: '',
        },
        onSubmit: values => {
            // TODO: do zastapienia czymś później
            alert(JSON.stringify(values, null, 2));
        },
    });

    /*
    const OldPasswordSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Required')
    });
*/

    const [authorizeUser] = useMutation(AUTHORIZE_USER);
    const user = useContext(UserContext);

    const validateOldPassword = (value: string) => {

        if (user?.mail) {
            (() => {
                authorizeUser({
                    variables: {user: {mail: user.mail, password: value}},
                })
                    .then(() => {
                        formik.values = { ...formik.values, oldPasswordError: false, oldPasswordHelperText: '' };
                        formik.setValues(formik.values);
                    })
                    .catch(err => {
                        const helperText = () => {
                            if (err.message === 'Wrong mail or password') {
                                return t('settings-page.wrong-old-password');
                            }
                            openAlertDialog({
                                type: 'error',
                                description: `${t('settings-page.wrong-old-password-error')}: ${err.message}`,
                            });

                            return t('settings-page.wrong-old-password-error');
                        };
                        formik.values = { ...formik.values, oldPasswordError: true, oldPasswordHelperText: helperText() };
                        formik.setValues(formik.values);
                    });
            })();
        }

    };

    const toggleShowOldPassword = () => {
        formik.values = { ...formik.values, showOldPassword: !formik.values.showOldPassword };
        formik.setValues(formik.values);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        validateOldPassword(event.target.value);
    };

    return (
        <Grid container>
            <Grid container item xs={12} spacing={10}>
                <Grid item xs={6}>
                    <FormControlOldPasswordFormik
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        show={formik.values.showOldPassword}
                        toggle={toggleShowOldPassword}
                        error={formik.values.oldPasswordError}
                        helperText={formik.values.oldPasswordHelperText}
                    />
                    <div className={classes.submitWrapper}>
                        <ButtonSecondary
                            type="submit"
                            variant="contained"
                            // TODO: poprawić warunek; to musi być jednak osobny state
                            disabled={!formik.dirty || formik.values.oldPasswordError}
                            className={classes.changePasswordButton}
                        >
                            {t('settings-page.change-password')}
                        </ButtonSecondary>
                    </div>
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
        submitWrapper: {
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(2) * 1.25,
            },
        },
        changePasswordButton: {
            float: 'inline-end',
        },
    }),
);
