import { TextField, Typography, Box } from '@material-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidEmail } from './isValidEmail';
import { ButtonSecondary } from '../../components/Button';
import { useIsDevice } from '../../queries/useBreakpoints';

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
        setInputValue(value);
        onChange(value);
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
                error={isError}
                fullWidth
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                helperText={isError ? t(`${tPrefix}.incorrect-email-helper-text`) : t(`${tPrefix}.email-helper-text`)}
                onChange={({ target: { value } }) => handleChange(value)}
            />
            <Box mt={3} display="flex" justifyContent="flex-end" width="100%" justifyItems="flex-end">
                <ButtonSecondary
                    variant="contained"
                    onClick={handleSubmit}
                    innerText={t('forgot-password-page.continue')}
                />
            </Box>
        </>
    );
}
