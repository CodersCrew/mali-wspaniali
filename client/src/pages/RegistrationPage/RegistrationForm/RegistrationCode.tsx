import React from 'react';
import { TextField, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationCodeProps } from './types';
import { openAlertDialog } from '../../../components/AlertDialog';
import { Button } from '../../../components/Button';

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
                <Button variant="text" className={classPrevBtn} onClick={handleClick} innerText="registration-page.no-code" />
                <Button
                    onClick={handleNext}
                    className={classNextBtn}
                    disabled={code.length < 9}
                    data-testid="code-next"
                    innerText="next"
                />
            </div>
        </>
    );
};
