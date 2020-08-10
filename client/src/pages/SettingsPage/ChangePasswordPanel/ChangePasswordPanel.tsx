import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Theme } from '../../../theme';
import { theme } from '../../../theme/theme';
import { useAuthorization } from '../../../hooks/useAuthorization';
import {
    FormControlConfirmNewPassword,
    FormControlNewPassword,
    FormControlOldPassword,
    ValidationMarks,
} from './ChangePasswordPanelFormControls';
import { ButtonSecondary } from '../../../components/Button';

export const ChangePasswordPanel = () => {
    useAuthorization(true);
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <form
                onSubmit={event => {
                    handleSubmit(event);
                }}
                className={classes.container}
            >
                <FormControlOldPassword
                    states={values}
                    onChange={states => {
                        setValues({
                            ...values,
                            ...states.states,
                        });
                    }}
                />

                <FormControlNewPassword
                    key={`FormControlNewPassword-${values.newPasswordDisabled ? 'disabled' : 'enabled'}`}
                    states={values}
                    onChange={states => {
                        setValues({
                            ...values,
                            ...states.states,
                        });
                    }}
                />

                <ValidationMarks
                    onChange={states => {
                        setValues({
                            ...values,
                            ...states.states,
                        });
                    }}
                    states={values}
                />

                <FormControlConfirmNewPassword
                    key={`FormControlConfirmNewPassword-${values.confirmNewPasswordDisabled ? 'disabled' : 'enabled'}`}
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
                        variant="text"
                        // TODO: zrobić to w inny sposób
                        href="/parent/settings"
                        innerText={t('settings-page.cancel-button')}
                        className={classes.cancelChangePasswordButton}
                        disabled={true}
                    />
                    <ButtonSecondary
                        type="submit"
                        variant="contained"
                        disabled={values.changePasswordButtonDisabled}
                        className={classes.changePasswordButton}
                    >
                        {t('settings-page.change-password')}
                    </ButtonSecondary>
                </div>

                <div className={classes.problems}>
                    <Typography>{'Masz problem ze zmianą hasła?'}</Typography>
                    <Typography>{'Bez obaw, skontaktuj się z fundacją, aby go rozwiązać'}</Typography>
                </div>
            </form>
        </ThemeProvider>
    );
};

// eslint-disable-next-line no-shadow
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            justifyContent: 'center',
            alignItems: 'left',
            height: '100%',
        },
        submitWrapper: {
            width: '40%',
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
            fontSize: '12px',
        },
        problems: {
            width: '40%',
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '15px',
            lineHeight: '120%',
        },
    }),
);
