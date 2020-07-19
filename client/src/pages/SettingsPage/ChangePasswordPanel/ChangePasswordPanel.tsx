import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff, HighlightOff, CheckCircle } from '@material-ui/icons';
import {
    InputAdornment,
    InputLabel,
    IconButton,
    FormControl,
    OutlinedInput,
    Button,
    InputBase,
} from '@material-ui/core';
import { theme } from '../../../theme/theme';
import { useAuthorization } from '../../../hooks/useAuthorization';
import {
    validatePasswordLength,
    validatePasswordNumber,
    validatePasswordSymbol,
    validatePasswordUppercase,
} from './ValidatePassword';
import { FormControlOldPassword } from './ChangePasswordPanelFormControls';

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

    const handleClickShowNewPassword = () => {
        setValues({
            ...values,
            showNewPassword: !values.showNewPassword,
        });
    };

    const handleClickShowConfirmNewPassword = () => {
        setValues({
            ...values,
            showConfirmNewPassword: !values.showConfirmNewPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validateNewPassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const password = event.target.value;
        const validLength = validatePasswordLength(password);
        const validUppercase = validatePasswordUppercase(password);
        const validNumber = validatePasswordNumber(password);
        const validSymbol = validatePasswordSymbol(password);
        const confirmDisabled = !(validLength && validUppercase && validNumber && validSymbol);
        const buttonDisabled = confirmDisabled || !(password === values.confirmNewPassword);
        setValues({
            ...values,
            newPassword: password,
            validPasswordLength: validLength,
            validPasswordUppercase: validUppercase,
            validPasswordNumber: validNumber,
            validPasswordSymbol: validSymbol,
            confirmNewPasswordDisabled: confirmDisabled,
            changePasswordButtonDisabled: buttonDisabled,
        });
    };

    const validateConfirmNewPassword = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const password = event.target.value;
        if (values.newPassword === password) {
            setValues({ ...values, confirmNewPassword: password, changePasswordButtonDisabled: false });
        } else {
            setValues({ ...values, confirmNewPassword: password, changePasswordButtonDisabled: true });
        }
    };

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

                <FormControl variant="outlined" className={classes.form}>
                    <InputLabel htmlFor="outlined-adornment-password">{t('settings-page.new-password')}</InputLabel>
                    <OutlinedInput
                        required
                        disabled={values.newPasswordDisabled}
                        onChange={event => validateNewPassword(event)}
                        value={values.newPassword}
                        id="new-password"
                        label={t('settings-page.new-password')}
                        type={values.showNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    disabled={values.newPasswordDisabled}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputProps={{
                            tabindex: '2',
                        }}
                    />
                </FormControl>

                <div className={classes.checkboxWrapper}>
                    <InputBase
                        disabled={values.newPasswordDisabled}
                        className={classes.margin}
                        value={t('settings-page.valid-password.min-length')}
                        startAdornment={
                            <InputAdornment position="start">
                                {!values.validPasswordLength && <HighlightOff className={classes.adornment} />}
                                {values.validPasswordLength && <CheckCircle className={classes.adornment} />}
                            </InputAdornment>
                        }
                    />
                    <InputBase
                        disabled={values.newPasswordDisabled}
                        className={classes.margin}
                        value={t('settings-page.valid-password.uppercase-letter')}
                        startAdornment={
                            <InputAdornment position="start">
                                {!values.validPasswordUppercase && <HighlightOff className={classes.adornment} />}
                                {values.validPasswordUppercase && <CheckCircle className={classes.adornment} />}
                            </InputAdornment>
                        }
                    />
                    <InputBase
                        disabled={values.newPasswordDisabled}
                        className={classes.margin}
                        value={t('settings-page.valid-password.number')}
                        startAdornment={
                            <InputAdornment position="start">
                                {!values.validPasswordNumber && <HighlightOff className={classes.adornment} />}
                                {values.validPasswordNumber && <CheckCircle className={classes.adornment} />}
                            </InputAdornment>
                        }
                    />
                    <InputBase
                        disabled={values.newPasswordDisabled}
                        className={classes.margin}
                        value={t('settings-page.valid-password.symbol')}
                        startAdornment={
                            <InputAdornment position="start">
                                {!values.validPasswordSymbol && <HighlightOff className={classes.adornment} />}
                                {values.validPasswordSymbol && <CheckCircle className={classes.adornment} />}
                            </InputAdornment>
                        }
                    />
                </div>

                <FormControl variant="outlined" className={classes.form}>
                    <InputLabel htmlFor="outlined-adornment-password">
                        {t('settings-page.confirm-new-password')}
                    </InputLabel>
                    <OutlinedInput
                        required
                        disabled={values.confirmNewPasswordDisabled}
                        onChange={event => validateConfirmNewPassword(event)}
                        value={values.confirmNewPassword}
                        id="confirm-new-password"
                        label={t('settings-page.confirm-new-password')}
                        type={values.showConfirmNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    disabled={values.confirmNewPasswordDisabled}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        inputProps={{
                            tabindex: '3',
                        }}
                    />
                </FormControl>

                <div className={classes.submitWrapper}>
                    {' '}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={values.changePasswordButtonDisabled}
                        color="secondary"
                        className={classes.changePasswordButton}
                    >
                        {t('settings-page.change-password')}
                    </Button>
                </div>
            </form>
        </ThemeProvider>
    );
};

const useStyles = makeStyles({
    container: {
        justifyContent: 'center',
        alignItems: 'left',
        height: '100%',
    },
    form: {
        display: 'block',
        marginBottom: '15px',
    },
    checkboxWrapper: {
        marginBottom: '15px',
        width: '50%',
    },
    margin: {
        fontSize: '0.75rem',
        paddingLeft: '14px',
        width: '35%',
    },
    adornment: {
        fontSize: '1rem',
    },
    submitWrapper: {},
    changePasswordButton: {},
});
