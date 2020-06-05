import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationCodeProps } from './types';
import { openAlertDialog } from '../../../components/AlertDialog';
import { getInvitationCodes } from '../../../queries/invitationCodeQueries';
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
    const codes = useRef<InvitationCode[]>([]);

    useEffect(() => {
        const fetchCodes = async () => {
            const res = await getInvitationCodes();
            codes.current = res.invitationCode;
        };
        fetchCodes();
    }, []);

    const handleCodeError = () => {
        if (!codeTest(code, codes.current)) {
            setCodeError(true);
        } else {
            setCodeError(false);
        }
    };

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
                error={codeError && !codeTest(code, codes.current)}
                helperText={codeError && t('registration-page.invalid-code')}
                onBlur={handleCodeError}
            />
            <div className={classButton}>
                <Button className={classPrevBtn} onClick={handleClick}>
                    {t('registration-page.no-code')}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classNextBtn}
                    color="secondary"
                    disabled={!codeTest(code, codes.current)}
                    data-testid="code-next"
                >
                    {t('next')}
                </Button>
            </div>
        </>
    );
};
