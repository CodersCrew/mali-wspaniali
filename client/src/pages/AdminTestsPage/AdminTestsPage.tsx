import React, { useEffect } from 'react';

import { activePage } from '../../apollo_client';

export function TestManagementPage() {
    useEffect(() => {
        activePage(['admin-menu.test-management']);
    }, []);

    return <div>tests page</div>;
}
