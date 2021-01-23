import React from 'react';

import { activePage } from '../../apollo_client';

export default function InstructorSettingsPage() {
    React.useEffect(() => {
        activePage(['instructor-menu.settings']);
    }, []);

    return <div>instructor settings page</div>;
}
