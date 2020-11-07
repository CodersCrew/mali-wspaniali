import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export function AdminInstructorsPage() {
    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    return <div>Instructors Management Page</div>;
}
