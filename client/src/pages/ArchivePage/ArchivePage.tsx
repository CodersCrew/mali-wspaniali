import React from 'react';
import { activePage } from '../../apollo_client';

export default function ArchivePage() {
    React.useEffect(() => {
        activePage(['admin-menu.newsletter.title', 'admin-menu.newsletter.archive']);
    }, []);

    return <div>Archive Page</div>;
}
