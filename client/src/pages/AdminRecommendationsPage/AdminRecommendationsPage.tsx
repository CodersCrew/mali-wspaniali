import React from 'react';
import { activePage } from '../../apollo_client';

export default function AdminRecommendationsPage() {
    React.useEffect(() => {
        activePage(['admin-menu.results.title', 'admin-menu.results.advice-and-recommendations']);
    }, []);

    return <div>Advice and Recommendations Page</div>;
}
