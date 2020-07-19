import React from 'react';
import { TextField } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationEmailProps } from './types';
import { emailTest } from '../emailTest';
import { Button } from '../../../components/Button';

export const RegistrationEmail = ({
    handleChange,
    handleNext,
    handleBack,
    email,
    classForm,
    classButton,
    classNextBtn,
    classPrevBtn,
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
                <Button variant="text" onClick={handleBack} className={classPrevBtn} innerText="back" />
                <Button
                    onClick={handleNext}
                    className={classNextBtn}
                    disabled={!emailTest(email)}
                    innerText="next"
                />
            </div>
        </>
    );
};
