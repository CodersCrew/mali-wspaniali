import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, Typography, Box, FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { Theme } from '../../theme/types';
import { PasswordChangeProps, PasswordValidation } from './types';
import { PasswordStrengthChips } from './PasswordStrengthChips';
import { ButtonSecondary } from '../../components/Button';
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
        <Box className={classes.container}>
            <Typography variant="subtitle1" align="center" className={classes.subtitle}>
                {t('password-change-page.new-password-subtitle')}
            </Typography>
            <FormControl variant="outlined" className={classes.formItem}>
                <InputLabel htmlFor="password">{t('password-change-page.new-password')}</InputLabel>
                <OutlinedInput
                    required
                    id="password"
                    type={'password'}
                    value={password}
                    onChange={handleChange}
                    data-testid="password"
                    label={t('password-change-page.new-password')}
                />
                <PasswordStrengthChips passwordValidation={passwordValidation} />
            </FormControl>
            <FormControl variant="outlined" className={classes.formItem}>
                <InputLabel htmlFor="passwordConfirm">{t('password-change-page.repeat-password')}</InputLabel>
                <OutlinedInput
                    required
                    id="passwordConfirm"
                    type={'password'}
                    value={passwordConfirm}
                    onChange={handleChange}
                    data-testid="confirmPassword"
                    label={t('password-change-page.repeat-password')}
                />
            </FormControl>
            <div className={classes.buttonWrapper}>
                <ButtonSecondary
                    variant="contained"
                    type="submit"
                    className={classes.createPasswordButton}
                    innerText={t('password-change-page.create-new-password')}
                />
            </div>
        </Box>
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
            marginBottom: theme.spacing(3),
            width: '350px',
        },
        formItem: {
            width: '100%',

            [theme.breakpoints.down('sm')]: {
                margin: '10px 0',
            },
        },
        buttonWrapper: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: 33,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),

            '&.emailContent': {
                justifyContent: 'flex-end',
            },

            [theme.breakpoints.down('sm')]: {
                margin: '10px 0 20px 0',
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
