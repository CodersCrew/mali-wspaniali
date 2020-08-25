import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';

export function ParentAgreementsPage() {
    useEffect(() => {
        activePage(['parent-menu.agreements']);
    }, []);

    return <div>Agreements</div>;
}
