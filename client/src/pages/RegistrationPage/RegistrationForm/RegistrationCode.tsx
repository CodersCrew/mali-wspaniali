import React from 'react';
import { TextField, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

import { openAlertDialog } from '../../../components/AlertDialog';
import { ButtonSecondary } from '../../../components/Button';

import { RegistrationCodeProps } from './types';

export const RegistrationCode = ({
    handleChange,
    handleNext,
    code,
    classForm,
    classButton,
    classNextBtn,
}: RegistrationCodeProps) => {
    const { t } = useTranslation();

    const handleClick = () => {
        openAlertDialog({
            type: 'info',
            title: t('registration-page.no-code'),
            description: t('registration-page.no-code-desc'),
        });
    };

    return (
        <>
            <Typography variant="body1">{t('registration-page.enter-code-text')}</Typography>
            <TextField
                required
                onChange={handleChange}
                value={code}
                id="code"
                type="text"
                label={t('registration-page.enter-code')}
                variant="outlined"
                inputProps={{ 'data-testid': 'code' }}
                className={classForm}
            />
            <div className={classButton}>
                <ButtonSecondary variant="text" onClick={handleClick} innerText={t('registration-page.no-code')} />
                <ButtonSecondary
                    variant="contained"
                    onClick={handleNext}
                    className={classNextBtn}
                    disabled={code.length < 9}
                    data-testid="code-next"
                    innerText={t('next')}
                />
            </div>
        </>
    );
};
