import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationCodeProps } from './types';
import { openAlertDialog } from '../../../components/AlertDialog';

export const RegistrationCode = ({
    handleChange,
    handleNext,
    code,
    classForm,
    classButton,
    classPrevBtn,
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
            <Typography>{t('registration-page.enter-code-text')}</Typography>
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
                <Button className={classPrevBtn} onClick={handleClick}>
                    {t('registration-page.no-code')}
                </Button>
                <Button variant="contained" onClick={handleNext} className={classNextBtn} color="secondary">
                    {t('next')}
                </Button>
            </div>
        </>
    );
};
