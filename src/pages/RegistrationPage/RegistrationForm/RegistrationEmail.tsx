import React from 'react';
import { TextField, Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationEmailProps } from './types';
import { emailTest } from '../emailTest';

export const RegistrationEmail = ({
    handleChange,
    handleNext,
    email,
    classForm,
    classButton,
    classNextBtn,
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
                helperText={t('login-page.e-mail-helper-text')}
            />
            <div className={classButton}>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classNextBtn}
                    color="secondary"
                    disabled={!emailTest(email)}
                >
                    {t('next')}
                </Button>
            </div>
        </>
    );
};
