import React, { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import {
    FormControlConfirmNewPassword,
    FormControlNewPassword,
    FormControlOldPassword,
} from './ChangePasswordPanelFormControls';
import { ButtonSecondary } from '../../../components/Button';
import { Me } from '../../../graphql/types';
import { ChangePasswordReducer, ChangePasswordInitialState, TYPE_NEW_PASSWORD } from './ChangePasswordReducer';
import { PasswordStrengthChips } from '../../RegistrationPage/RegistrationForm/PasswordStrengthChips';
import { PasswordValidation } from '../../RegistrationPage/RegistrationForm/types';
import {
    passwordCapitalTest,
    passwordDigitTest,
    passwordLengthTest,
    passwordSpecialTest,
} from '../../RegistrationPage/passwordStrengthTest';

interface Props {
    user: Me;
}

const initialPasswordValidation: PasswordValidation = {
    length: false,
    capital: false,
    digit: false,
    special: false,
};

export const ChangePasswordPanel = ({ user }: Props) => {
    const [state, dispatch] = useReducer(ChangePasswordReducer, ChangePasswordInitialState);

    const { t } = useTranslation();
    const classes = useStyles();
    const [values, setValues] = useState({
        changePasswordButtonDisabled: true,
        confirmNewPassword: '',
        confirmNewPasswordDisabled: true,
        currentUserEmail: '',
        newPassword: '',
        newPasswordDisabled: true,
        oldPassword: '',
        oldPasswordError: false,
        oldPasswordHelperText: ' ',
        showConfirmNewPassword: false,
        showNewPassword: false,
        showOldPassword: false,
        validPasswordLength: false,
        validPasswordNumber: false,
        validPasswordSymbol: false,
        validPasswordUppercase: false,
    });
    const [passwordValidation, setPasswordValidation] = useState(initialPasswordValidation);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handlePasswordVisibility = () => dispatch({ type: 'changeOldPasswordVisibility' });

    const handleOldPasswordChange = (password: string, isSuccess: boolean) =>
        dispatch({ type: 'changeOldPassword', values: { password, isSuccess } });

    useEffect(() => {
        setPasswordValidation({
            length: passwordLengthTest(values.newPassword),
            capital: passwordCapitalTest(values.newPassword),
            digit: passwordDigitTest(values.newPassword),
            special: passwordSpecialTest(values.newPassword),
        });
    }, [values.newPassword]);

    return (
        <Grid container>
            <Grid container item xs={12} spacing={10}>
                <Grid item xs={6}>
                    <form
                        onSubmit={event => {
                            handleSubmit(event);
                        }}
                        className={classes.container}
                    >
                        <FormControlOldPassword
                            email={user.mail}
                            states={values}
                            onChange={states => {
                                setValues({
                                    ...values,
                                    ...states.states,
                                });
                            }}
                            onToggleVisibility={handlePasswordVisibility}
                            onOldPasswordChange={handleOldPasswordChange}
                            visibility={state.oldPasswordVisibility}
                        />

                        <FormControlNewPassword
                            key={`FormControlNewPassword-${values.newPasswordDisabled ? 'disabled' : 'enabled'}`}
                            states={values}
                            isActive={isFormControlNewPassword(state.activeState)}
                            onChange={states => {
                                setValues({
                                    ...values,
                                    ...states.states,
                                });
                            }}
                        />

                        <div className={classes.marksWrapper}>
                            <PasswordStrengthChips passwordValidation={passwordValidation} />
                        </div>

                        <FormControlConfirmNewPassword
                            key={`FormControlConfirmNewPassword-${
                                values.confirmNewPasswordDisabled ? 'disabled' : 'enabled'
                            }`}
                            states={values}
                            onChange={states => {
                                setValues({
                                    ...values,
                                    ...states.states,
                                });
                            }}
                        />

                        <div className={classes.submitWrapper}>
                            <ButtonSecondary
                                type="submit"
                                variant="contained"
                                disabled={values.changePasswordButtonDisabled}
                                className={classes.changePasswordButton}
                            >
                                {t('settings-page.change-password')}
                            </ButtonSecondary>
                        </div>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={'h6'} className={classes.problems}>
                        {t('settings-page.change-password-problems')}
                    </Typography>
                    <Typography variant={'subtitle1'} className={classes.problems}>
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
        container: {},
        submitWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                margin: '0 0 20px 0',
            },
        },
        changePasswordButton: {},
        cancelChangePasswordButton: {
            textAlign: 'center',
            whiteSpace: 'normal',
        },
        problems: {
            marginBottom: '16px',
        },
        marksWrapper: {
            marginBottom: '16px',
        },
    }),
);

function isFormControlNewPassword(state: string) {
    return state === TYPE_NEW_PASSWORD;
}
