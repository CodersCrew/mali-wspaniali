import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../components/CustomContainer';
import { AdminSettingsListContainers } from './AdminSettingsListContainer';

export const AdminSettingsList = () => {
    const { t } = useTranslation();

    return (
        <CustomContainer
            header={<Typography variant="h4">{t('parent-settings.header')}</Typography>}
            container={<AdminSettingsListContainers />}
        />
    );
};
