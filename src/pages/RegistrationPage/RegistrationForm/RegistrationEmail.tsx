import React from 'react';
import { TextField, Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationEmailProps } from './types';

export const RegistrationEmail = ({
    handleChange,
    handleNext,
    email,
    form,
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
                    disabled={!form.email}
                >
                    {t('next')}
                </Button>
            </div>
        </>
    );
};
