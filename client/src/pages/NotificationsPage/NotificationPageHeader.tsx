import React from 'react';
import { Typography, ThemeProvider } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import { PageTitle } from '../../components/PageTitle/PageTitle';

export const NotificationPageHeader = () => {
    const { t } = useTranslation();

    return (
        <ThemeProvider theme={theme}>
            <PageTitle text={t('notifications-page.header')} />
            <Typography variant="h6" gutterBottom>
                {t('notifications-page.description')}
            </Typography>
        </ThemeProvider>
    );
};
