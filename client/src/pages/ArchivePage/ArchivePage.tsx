import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export default function ArchivePage() {
    useEffect(() => {
        activePage(['admin-menu.newsletter.title', 'admin-menu.newsletter.archive']);
    }, []);

    return <div>Archive Page</div>;
}
