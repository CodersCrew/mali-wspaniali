import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { activePage } from '../../apollo_client';

import { AdminSettingsList } from './AdminSettingsList';
import { PageContainer } from '../../components/PageContainer';

export const AdminSettingsPage = () => {
    useEffect(() => {
        activePage(['admin-menu.settings.title']);
    }, []);

    return (
        <PageContainer>
            <Paper>
                <AdminSettingsList />
            </Paper>
        </PageContainer>
    );
};
