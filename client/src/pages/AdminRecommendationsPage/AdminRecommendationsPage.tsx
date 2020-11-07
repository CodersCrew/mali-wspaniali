import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export function AdminRecommendationsPage() {
    useEffect(() => {
        activePage(['admin-menu.results.title', 'admin-menu.results.advice-and-recommendations']);
    }, []);

    return <div>Advice and Recommendations Page</div>;
}
