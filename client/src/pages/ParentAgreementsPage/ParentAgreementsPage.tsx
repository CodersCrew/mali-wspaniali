import React, { useEffect, useContext } from 'react';
import { activePage } from '../../apollo_client';
import { UserContext } from '../AppWrapper';
import { Agreements } from './Agreements';

export function ParentAgreementsPage() {
    const user = useContext(UserContext);

    useEffect(() => {
        activePage(['parent-menu.agreements']);
    }, []);

    if (!user) return null;

    return <Agreements agreements={user.agreements} />;
}
