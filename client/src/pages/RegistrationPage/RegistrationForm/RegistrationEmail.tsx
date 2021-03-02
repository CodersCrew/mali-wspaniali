import React from 'react';
import { TextField } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

import { emailTest } from '../emailTest';
import { ButtonSecondary } from '../../../components/Button';

import { RegistrationEmailProps } from './types';

export const RegistrationEmail = ({
    handleChange,
    handleBack,
    handleNext,
    email,
    classForm,
    classButton,
    classNextBtn,
    error,
}: RegistrationEmailProps) => {
    const { t } = useTranslation();

    return (
        <>
            <TextField
                required
                onChange={handleChange}
                value={email}
                id="email"
                type="email"
                label={t('e-mail')}
                variant="outlined"
                inputProps={{ 'data-testid': 'email' }}
                className={classForm}
                error={error}
                helperText={error && t('registration-page.invalid-email')}
            />
            <div className={classButton}>
                <ButtonSecondary
                    variant="contained"
                    onClick={handleNext}
                    className={classNextBtn}
                    disabled={!emailTest(email)}
                    innerText={t('next')}
                />
                <ButtonSecondary onClick={handleBack} variant="text" innerText={t('back')} />
            </div>
        </>
    );
};
