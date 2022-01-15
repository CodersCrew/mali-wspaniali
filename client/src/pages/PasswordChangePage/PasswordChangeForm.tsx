import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography, Box, FormHelperText, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';

import { Theme } from '../../theme';
import { ButtonSecondary } from '../../components/Button';
import { PasswordStrengthChips } from '../RegistrationPage/RegistrationForm/PasswordStrengthChips';
import { useIsDevice } from '../../queries/useBreakpoints';
import { PasswordValidation } from './types';
import {
    passwordLengthTest,
    passwordSpecialTest,
    passwordDigitTest,
    passwordCapitalTest,
} from './passwordStrengthTest';
import { PasswordChangeFormInput } from './PasswordChangeFormInput';

const initialPasswordValidation: PasswordValidation = {
    length: false,
    capital: false,
    digit: false,
    special: false,
};

interface PasswordChangeProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    password: string;
    passwordConfirm: string;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
}

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

    const [passwordValidation, setPasswordValidation] = useState(initialPasswordValidation);

    useEffect(() => {
        setPasswordValidation({
            length: passwordLengthTest(password),
            capital: passwordCapitalTest(password),
            digit: passwordDigitTest(password),
            special: passwordSpecialTest(password),
        });
    }, [password]);

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

            <PasswordChangeFormInput
                value={password}
                onChange={handleChange}
                error={error}
                id="password"
                label={t('password-change-page.new-password')}
            >
                {error && <FormHelperText error={error}>{t('registration-page.password-mismatch')}</FormHelperText>}
                <PasswordStrengthChips passwordValidation={passwordValidation} />
            </PasswordChangeFormInput>

            <Box
                className={clsx({
                    [classes.separator]: isDesktop,
                    [classes.separatorMobile]: !isDesktop,
                })}
            />

            <PasswordChangeFormInput
                value={passwordConfirm}
                onChange={handleChange}
                error={error}
                id="passwordConfirm"
                label={t('password-change-page.repeat-password')}
            >
                {error && <FormHelperText error={error}>{t('registration-page.password-mismatch')}</FormHelperText>}
            </PasswordChangeFormInput>

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

    function handleClick() {
        if (password !== passwordConfirm) setError(true);
    }
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
