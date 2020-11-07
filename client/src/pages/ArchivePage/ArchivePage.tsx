import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export function ArchivePage() {
    useEffect(() => {
        activePage(['admin-menu.newsletter.archive']);
    }, []);

    return <div>Archive Page</div>;
}
