import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { ButtonSecondary } from '../../../components/Button';
import { FormControlOldPasswordFormik } from './ChangePasswordPanelFormControlsFormik/FormControlOldPasswordFormik';
import { openAlertDialog } from '../../../components/AlertDialog';
import { validateOldPassword } from '../ChangePasswordPanel/ChangePasswordPanelFormControls';
import { AUTHORIZE_USER } from '../../../graphql/userRepository';
import { UserContext } from '../../AppWrapper';
import { FormControlNewPasswordFormik } from './ChangePasswordPanelFormControlsFormik/FormControlNewPasswordFormik';
import { ValidateOldPassword } from './ChangePasswordPanelFormControlsFormik/interfaces';

export const ChangePasswordPanelFormik = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    const OldPasswordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Required'),
        /*
            .test('yupValidateOldPassword',
                'wrong password',
                function(value) {
                    console.log(value);
                
                    return true;
                }),
*/
        newPassword: Yup.string()
            .required('Required')
            .min(8, 'too short'),
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            showOldPassword: false,
            newPassword: '',
            showNewPassword: false,
        },
        onSubmit: values => {
            // TODO: to be replaced later
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: OldPasswordSchema,
    });

    // This re-renders component;
    // without it yup.required on the oldPassword doesn't work if fired as the first action
    // const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

    const oldPasswordValid = () => {
        formik.errors.oldPassword = '';
    };

    const oldPasswordInvalid = (error: any) => {
        if (error.message === 'Wrong mail or password') {
            formik.setErrors({ oldPassword: t('settings-page.wrong-old-password') });
            // forceUpdate();
        } else {
            openAlertDialog({
                type: 'error',
                description: `${t('settings-page.wrong-old-password-error')}: ${error.message}`,
            });
            formik.setErrors({ oldPassword: t('settings-page.wrong-old-password-error') });
            // forceUpdate();
        }
    };

    const toggleShowOldPassword = () => {
        formik.setValues({ ...formik.values, showOldPassword: !formik.values.showOldPassword });
    };

    const [authorizeUser] = useMutation(AUTHORIZE_USER);
    const user = useContext(UserContext);
    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        formik.handleBlur(event);

        const ValidateOldPasswordParams: ValidateOldPassword = {
            password: event.target.value,
            mail: user ? user.mail : '',
            authorizeUser,
            callbackValid: oldPasswordValid,
            callbackInvalid: oldPasswordInvalid,
        };

        if (event.target.value) validateOldPassword(ValidateOldPasswordParams);
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
                        error={!!formik.errors.oldPassword}
                        helperText={formik.errors.oldPassword || ''}
                    />
                    <FormControlNewPasswordFormik />
                    <Typography className={classes.submitWrapper}>
                        <ButtonSecondary
                            type="submit"
                            variant="contained"
                            // TODO: poprawić warunek; to musi być jednak osobny state
                            disabled={!formik.dirty || !!formik.errors.oldPassword}
                            className={classes.changePasswordButton}
                        >
                            {t('settings-page.change-password')}
                        </ButtonSecondary>
                    </Typography>
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
