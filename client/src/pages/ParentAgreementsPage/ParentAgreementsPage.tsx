import React, { useEffect } from 'react';
import { activePage } from '../../apollo_client';
import { Agreements } from './Agreements';
import { useMe } from '../../utils/useMe';

export function ParentAgreementsPage() {
    const user = useMe();

    useEffect(() => {
        activePage(['parent-menu.agreements']);
    }, []);

    if (!user) return null;

    return <Agreements agreements={user.agreements} />;
}
