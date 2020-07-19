import React from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { PresentPasswordPageProps } from './types';
import { isValidEmail } from './isValidEmail';
import { useTranslation } from 'react-i18next';

const t_prefix = 'forgot-password-page';

export const PresentPasswordPage = ({
    subtitle,
    subtitleThin,
    textField,
    buttonWrapper,
    button,
    underlinedText,
    handleInputChange,
    handleCreateNewPassword,
    email,
}: PresentPasswordPageProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="body1" className={subtitle}>
                {t(`${t_prefix}.its-ok`)}
            </Typography>
            <Typography variant="body1" className={`${subtitle} ${subtitleThin}`}>
                {t(`${t_prefix}.receive-link`)}
            </Typography>
            <TextField
                required
                value={email}
                id="email"
                label={t('e-mail')}
                variant="outlined"
                className={textField}
                helperText={t(`${t_prefix}.email-helper-text`)}
                onChange={handleInputChange}
            />
            <div className={buttonWrapper}>
                <Button
                    type="button"
                    variant="contained"
                    disabled={!isValidEmail(email)}
                    color="secondary"
                    className={button}
                    onClick={handleCreateNewPassword}
                >
                    {t(`${t_prefix}.new-password`)}
                </Button>
            </div>
            <div className={underlinedText}>
                <Typography variant="caption">{t(`${t_prefix}.problem`)}</Typography>
                <Typography variant="caption">{t(`${t_prefix}.contact`)}</Typography>
            </div>
        </>
    );
};
