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
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { Theme } from '../../theme';
import { ButtonSecondary } from '../../components/Button';
import { PasswordStrengthChips } from '../RegistrationPage/RegistrationForm/PasswordStrengthChips';

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

export function PasswordChangeForm({ handleChange, password, passwordConfirm }: PasswordChangeProps) {
    const { t } = useTranslation();
    const classes = useStyles();
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

    return (
        <div className={classes.container}>
            <Box mb={4}>
                <Typography variant="subtitle1" align="center" className={classes.subtitle}>
                    {t('password-change-page.new-password-subtitle')}
                </Typography>
            </Box>
            <FormControl variant="outlined" className={classes.formItem}>
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
                />
                <PasswordStrengthChips passwordValidation={passwordValidation} />
            </FormControl>
            <Box mb={2} />
            <FormControl variant="outlined" className={classes.formItem}>
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
                />
            </FormControl>
            <Box mt={5} className={classes.buttonWrapper}>
                <ButtonSecondary
                    variant="contained"
                    type="submit"
                    className={classes.createPasswordButton}
                    innerText={t('password-change-page.create-new-password')}
                />
            </Box>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
        },
        subtitle: {
            width: '350px',
        },
        formItem: {
            width: '100%',

            [theme.breakpoints.down('sm')]: {
                margin: theme.spacing(2, 0),
            },
        },
        buttonWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: 33,

            '&.emailContent': {
                justifyContent: 'flex-end',
            },

            [theme.breakpoints.down('sm')]: {
                margin: theme.spacing(2, 0, 6, 0),
            },
        },
        createPasswordButton: {
            marginLeft: 'auto',
            marginTop: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
                '& span': {
                    maxHeight: 17,
                },
            },
        },
    }),
);
