import React, { useEffect } from 'react';

import { activePage } from '../../apollo_client';

export function InstructorSettingsPage() {
    useEffect(() => {
        activePage(['instructor-menu.settings']);
    }, []);

    return <div>instructor settings page</div>;
}
