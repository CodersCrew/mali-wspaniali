import React from 'react';

import { activePage } from '../../apollo_client';

export default function AdminHomePage() {
    React.useEffect(() => {
        activePage(['admin-menu.home']);
    }, []);

    return <div>Admin Home Page</div>;
}
