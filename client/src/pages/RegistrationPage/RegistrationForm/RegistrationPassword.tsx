import React, { useState, useEffect } from 'react';
import {
    Typography,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
    makeStyles,
    createStyles,
    FormHelperText,
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import {
    passwordLengthTest,
    passwordSpecialTest,
    passwordDigitTest,
    passwordCapitalTest,
} from '../passwordStrengthTest';
import { ButtonSecondary } from '../../../components/Button';
import { Theme } from '../../../theme';

import { RegistrationPasswordProps, PasswordValidation } from './types';
import { PasswordStrengthChips } from './PasswordStrengthChips';

const initialPasswordValidation: PasswordValidation = {
    length: false,
    capital: false,
    digit: false,
    special: false,
};

export const RegistrationPassword = ({
    handleChange,
    handleBack,
    activeStep,
    password,
    passwordConfirm,
    classButton,
    classNextBtn,
    classFormItem,
    skip,
    loading,
    error,
    setError,
}: RegistrationPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(initialPasswordValidation);

    const classes = useStyles();
    const { t } = useTranslation();

    useEffect(() => {
        setPasswordValidation({
            length: passwordLengthTest(password),
            capital: passwordCapitalTest(password),
            digit: passwordDigitTest(password),
            special: passwordSpecialTest(password),
        });
    }, [password]);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (password !== passwordConfirm) setError(true);

        if (event.ctrlKey) {
            if (skip) skip(() => true);
        }
    };

    return (
        <>
            <Typography>{t('registration-page.create-password-text')}</Typography>
            <FormControl variant="outlined" className={classFormItem}>
                <InputLabel htmlFor="password">{t('password')}</InputLabel>
                <OutlinedInput
                    required
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                    data-testid="password"
                    autoFocus
                    error={error}
                />
                <PasswordStrengthChips passwordValidation={passwordValidation} />
            </FormControl>
            <FormControl variant="outlined" className={classFormItem}>
                <InputLabel htmlFor="passwordConfirm">{t('registration-page.password-confirm')}</InputLabel>
                <OutlinedInput
                    required
                    id="passwordConfirm"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordConfirm}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    data-testid="confirmPassword"
                    labelWidth={150}
                    error={error}
                />
                {error && <FormHelperText error={error}>{t('registration-page.password-mismatch')}</FormHelperText>}
            </FormControl>
            <div className={classButton}>
                <div className={classes.buttonWrapper}>
                    <ButtonSecondary
                        variant="contained"
                        type="submit"
                        className={classNextBtn}
                        innerText={t('registration-page.create-password')}
                        onClick={handleClick}
                        disabled={loading}
                        classes={loading ? { label: classes.buttonProgressText } : {}}
                    />
                </div>
                <ButtonSecondary
                    variant="text"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    innerText={t('back')}
                />
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonWrapper: {
            position: 'relative',
        },
        buttonProgress: {
            color: theme.palette.secondary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
            zIndex: 1000,
        },
        buttonProgressText: {
            color: theme.palette.action.hover,
        },
    }),
);
