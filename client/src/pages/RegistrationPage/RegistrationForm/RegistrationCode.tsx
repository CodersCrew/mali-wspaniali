import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationCodeProps } from './types';
import { openAlertDialog } from '../../../components/AlertDialog';
import { getCodeByUserInput } from '../../../queries/invitationCodeQueries';
import { InvitationCode } from '../../../firebase/types';
import { codeTest } from '../codeTest';

export const RegistrationCode = ({
    handleChange,
    handleNext,
    code,
    classForm,
    classButton,
    classPrevBtn,
    classNextBtn,
}: RegistrationCodeProps) => {
    const [codeError, setCodeError] = useState(false);

    const { t } = useTranslation();

    const handleClick = () => {
        openAlertDialog({
            type: 'info',
            title: t('registration-page.no-code'),
            description: t('registration-page.no-code-desc'),
        });
    };

    const handleCodeCheck = async () => {
        const data = (await getCodeByUserInput(code)) as InvitationCode[];
        if (data.length === 0) {
            setCodeError(true);
            return;
        }
        const test = codeTest(code, data);
        setCodeError(!test);
        if (test) handleNext();
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
                error={codeError}
                helperText={codeError && t('registration-page.invalid-code')}
            />
            <div className={classButton}>
                <Button className={classPrevBtn} onClick={handleClick}>
                    {t('registration-page.no-code')}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCodeCheck}
                    className={classNextBtn}
                    color="secondary"
                    disabled={code.length < 9}
                    data-testid="code-next"
                >
                    {t('next')}
                </Button>
            </div>
        </>
    );
};
