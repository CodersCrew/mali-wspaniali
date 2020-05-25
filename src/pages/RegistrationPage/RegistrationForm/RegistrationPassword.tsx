import React from 'react';
import { TextField, Typography, InputAdornment, Button } from '@material-ui/core/';
import { Visibility } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { RegistrationPasswordProps } from './types';

export const RegistrationPassword = ({
    handleChange,
    handleBack,
    handleNext,
    activeStep,
    password,
    passwordConfirm,
    classButton,
    classNextBtn,
    classPrevBtn,
    classFormItem,
}: RegistrationPasswordProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Typography>{t('registration-page.create-password-text')}</Typography>
            <TextField
                required
                onChange={handleChange}
                value={password}
                id="password"
                type="password"
                label={t('password')}
                variant="outlined"
                inputProps={{
                    'data-testid': 'password',
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <Visibility />
                        </InputAdornment>
                    ),
                }}
                className={classFormItem}
            />
            <TextField
                required
                onChange={handleChange}
                value={passwordConfirm}
                id="passwordConfirm"
                type="password"
                label={t('registration-page.password-confirm')}
                variant="outlined"
                inputProps={{
                    'data-testid': 'confirmPassword',
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <Visibility />
                        </InputAdornment>
                    ),
                }}
                disabled={!password}
                className={classFormItem}
            />
            <div className={classButton}>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classPrevBtn}>
                    {t('back')}
                </Button>
                <Button type="submit" variant="contained" className={classNextBtn} color="secondary">
                    {t('registration-page.create-password')}
                </Button>
            </div>
        </>
    );
};
