import React from 'react';
import { activePage } from '../../apollo_client';
import { PageContainer } from '../../components/PageContainer';
import { Search } from './Search';

export default function ArchivePage() {
    React.useEffect(() => {
        activePage(['admin-menu.newsletter.title', 'admin-menu.newsletter.archive']);
    }, []);

    return (
        <PageContainer>
            <Search />
        </PageContainer>
    );
}
