import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    makeStyles,
    createStyles,
    Typography,
    Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    CircularProgress,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';

import { Theme } from '../../theme';
import { ButtonSecondary } from '../../components/Button';
import { PasswordStrengthChips } from '../RegistrationPage/RegistrationForm/PasswordStrengthChips';
import { useIsDevice } from '../../queries/useBreakpoints';

import { PasswordChangeProps, PasswordValidation } from './types';
import {
    passwordLengthTest,
    passwordSpecialTest,
    passwordDigitTest,
    passwordCapitalTest,
} from './passwordStrengthTest';

const initialPasswordValidation: PasswordValidation = {
    length: false,
    capital: false,
    digit: false,
    special: false,
};

export function PasswordChangeForm({
    handleChange,
    password,
    passwordConfirm,
    error,
    setError,
    loading = false,
}: PasswordChangeProps) {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isDesktop } = useIsDevice();

    const [showPassword, setShowPassword] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(initialPasswordValidation);

    useEffect(() => {
        setPasswordValidation({
            length: passwordLengthTest(password),
            capital: passwordCapitalTest(password),
            digit: passwordDigitTest(password),
            special: passwordSpecialTest(password),
        });
    }, [password]);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleClick = () => {
        if (password !== passwordConfirm) setError(true);
    };

    return (
        <div className={classes.container}>
            <Typography
                variant="subtitle1"
                className={clsx({
                    [classes.subtitle]: true,
                    [classes.subtitleMobile]: !isDesktop,
                })}
            >
                {t('password-change-page.new-password-subtitle')}
            </Typography>
            <FormControl variant="outlined" fullWidth className={classes.formItem}>
                <InputLabel htmlFor="password">{t('password-change-page.new-password')}</InputLabel>
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
                    data-testid="password"
                    label={t('password-change-page.new-password')}
                    error={error}
                    autoFocus
                />
                <PasswordStrengthChips passwordValidation={passwordValidation} />
            </FormControl>
            <Box
                className={clsx({
                    [classes.separator]: isDesktop,
                    [classes.separatorMobile]: !isDesktop,
                })}
            />
            <FormControl variant="outlined" fullWidth className={clsx({ [classes.formItem]: !isDesktop })}>
                <InputLabel htmlFor="passwordConfirm">{t('password-change-page.repeat-password')}</InputLabel>
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
                    label={t('password-change-page.repeat-password')}
                    error={error}
                />
                {error && <FormHelperText error={error}>{t('registration-page.password-mismatch')}</FormHelperText>}
            </FormControl>
            <div
                className={clsx({
                    [classes.buttonWrapper]: true,
                    [classes.buttonWrapperMobile]: !isDesktop,
                })}
            >
                <div className={classes.loadingWrapper}>
                    <ButtonSecondary
                        variant="contained"
                        type="submit"
                        innerText={t('password-change-page.create-new-password')}
                        onClick={handleClick}
                        classes={loading ? { label: classes.buttonProgressText } : {}}
                    />
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        subtitle: {
            width: '350px',
            textAlign: 'center',
            marginBottom: theme.spacing(4),
        },
        subtitleMobile: {
            width: '100%',
            marginBottom: 0,
        },
        formItem: {
            marginTop: theme.spacing(2),
        },
        buttonWrapper: {
            width: '100%',
            paddingTop: '2em',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        buttonWrapperMobile: {
            marginTop: theme.spacing(5),
        },
        loadingWrapper: {
            position: 'relative',
        },
        buttonProgress: {
            color: theme.palette.secondary.contrastText,
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

        separator: {
            marginBottom: theme.spacing(2),
        },
        separatorMobile: {
            marginBottom: 0,
        },
    }),
);
