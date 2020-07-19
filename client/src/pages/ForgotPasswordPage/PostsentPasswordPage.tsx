import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PostsentPasswordPageProps } from './types';

const t_prefix = 'forgot-password-page';

export const PostsentPasswordPage = ({ subtitle, loginLink, loginLinkWrapper }: PostsentPasswordPageProps) => {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="body1" className={subtitle}>
                {t(`${t_prefix}.email-sent`)}
            </Typography>
            <Typography variant="body1" className={subtitle}>
                {t(`${t_prefix}.when-received`)}
            </Typography>
            <Button type="button" variant="contained" color="secondary" className={loginLinkWrapper}>
                <Link to="/login" className={loginLink}>
                    {t(`${t_prefix}.back-to-login`)}
                </Link>
            </Button>
        </>
    );
};
