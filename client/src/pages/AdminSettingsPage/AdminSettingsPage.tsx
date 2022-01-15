import { useEffect } from 'react';

import { activePage } from '../../apollo_client';
import { AdminSettingsList } from './AdminSettingsList';
import { PageContainer } from '../../components/PageContainer';

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
