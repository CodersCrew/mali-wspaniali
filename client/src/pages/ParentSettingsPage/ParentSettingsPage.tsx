import React, { useEffect } from 'react';

import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';
import { PageContainer } from '../../components/PageContainer';

import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';

export default function ParentSettingsPage() {
    const user = useMe();

    useEffect(() => {
        activePage(['parent-menu.settings']);
    }, []);

    if (!user) return null;

    return (
        <PageContainer>
            <ParentSettingsExpansionPanel user={user} />
        </PageContainer>
    );
}
