import { useEffect } from 'react';
import { activePage } from '../../apollo_client';
import { ParentSettingsExpansionPanel } from './ParentSettingsExpansionPanel';
import { useMe } from '../../utils/useMe';
import { PageContainer } from '../../components/PageContainer';

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
