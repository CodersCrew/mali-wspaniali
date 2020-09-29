import React, { useEffect } from 'react';

import { activePage } from '../../apollo_client';

export function AddResultsPage() {
    useEffect(() => {
        activePage(['instructor-menu.add-results']);
    }, []);

    return <div>add results</div>;
}
