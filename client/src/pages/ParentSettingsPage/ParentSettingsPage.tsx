import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export function ParentSettingsPage() {
    useEffect(() => {
        activePage(['parent-menu.settings']);
    }, []);

    return <div>Settings</div>;
}
