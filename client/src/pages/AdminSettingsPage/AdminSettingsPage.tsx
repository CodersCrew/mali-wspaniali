import React, { useEffect } from 'react';

import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';

import { AdminSettingsList } from './AdminSettingsList';

export default function AdminSettingsPage() {
    useEffect(() => {
        activePage(['admin-menu.settings.title']);
    }, []);

    return (
        <PageContainer>
            <AdminSettingsList />
        </PageContainer>
    );
}
