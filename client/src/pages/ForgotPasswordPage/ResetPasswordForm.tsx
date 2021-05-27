import { TextField, Typography, Box } from '@material-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../../components/Button';
import { useIsDevice } from '../../queries/useBreakpoints';
import { emailTest } from '../RegistrationPage/emailTest';

import { isValidEmail } from './isValidEmail';

const tPrefix = 'forgot-password-page';

type Props = {
    onChange: (value: string) => void;
    onSubmit: () => void;
    email: string;
};

export function ResetPasswordForm({ onChange, onSubmit, email }: Props) {
    const { t } = useTranslation();
    const device = useIsDevice();
    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = () => {
        if (isValidEmail(inputValue)) {
            setIsError(false);
            onSubmit();
        } else {
            setIsError(true);
        }
    };

    const handleChange = (value: string) => {
        setIsError(false);
        setInputValue(value);
        onChange(value);
    };

    const handleBlur = () => {
        if (!emailTest(email)) setIsError(true);
    };

    return (
        <>
            <Box mb={3}>
                <Typography variant="subtitle1" align="center">
                    {t(device.isDesktop ? `${tPrefix}.its-ok` : `${tPrefix}.its-ok-mobile`)}
                </Typography>
                <Typography variant="subtitle1" align="center">
                    {t(`${tPrefix}.receive-link`)}
                </Typography>
            </Box>
            <TextField
                autoFocus
                error={isError}
                fullWidth
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                helperText={isError ? t(`${tPrefix}.incorrect-email-helper-text`) : t(`${tPrefix}.email-helper-text`)}
                onChange={({ target: { value } }) => handleChange(value)}
                onBlur={handleBlur}
            />
            <Box mt={3} display="flex" justifyContent="flex-end" width="100%" justifyItems="flex-end">
                <ButtonSecondary
                    variant="contained"
                    onClick={handleSubmit}
                    innerText={t('forgot-password-page.continue')}
                    disabled={isError}
                />
            </Box>
        </>
    );
}
