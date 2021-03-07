import { TextField, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ButtonSecondary } from '../../components/Button';

const tPrefix = 'forgot-password-page';

type Props = {
    onChange: (value: string) => void;
    onSubmit: () => void;
    isDisabled: boolean;
    email: string;
};

export function ResetPasswordForm({ onChange, onSubmit, isDisabled, email }: Props) {
    const { t } = useTranslation();

    return (
        <>
            <Box mb={3}>
                <Typography variant="subtitle1" align="center">
                    {t(`${tPrefix}.its-ok`)}
                </Typography>
                <Typography variant="subtitle1" align="center">
                    {t(`${tPrefix}.receive-link`)}
                </Typography>
            </Box>
            <TextField
                required
                fullWidth
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                helperText={t(`${tPrefix}.email-helper-text`)}
                onChange={({ target: { value } }) => onChange(value)}
            />
            <Box mt={3} display="flex" justifyContent="flex-end" width="100%" justifyItems="flex-end">
                <ButtonSecondary
                    variant="contained"
                    disabled={isDisabled}
                    onClick={onSubmit}
                    innerText={t('forgot-password-page.continue')}
                />
            </Box>
        </>
    );
}
