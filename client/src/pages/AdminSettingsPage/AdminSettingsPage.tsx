import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export function AdminSettingsPage() {
    useEffect(() => {
        activePage(['admin-menu.settings']);
    }, []);

    return <div>Admin Settings Page</div>;
}
