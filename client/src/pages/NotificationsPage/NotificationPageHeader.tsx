import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '../../components/PageTitle/PageTitle';

export const NotificationPageHeader = () => {
    const { t } = useTranslation();

    return (
        <>
            <PageTitle text={t('notifications-page.header')} />
            <Typography variant="h6" gutterBottom>
                {t('notifications-page.description')}
            </Typography>
        </>
    );
};
