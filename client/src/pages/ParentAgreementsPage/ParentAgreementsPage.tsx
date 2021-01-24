import React, { useEffect } from 'react';

import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';

import { Agreements } from './Agreements';

export default function ParentAgreementsPage() {
    const user = useMe();

    useEffect(() => {
        activePage(['parent-menu.agreements']);
    }, []);

    if (!user) return null;

    const sortedAgreements = [...user.agreements].sort((a) => {
        return a.text === 'Marketing' ? -1 : 1;
    });

    return <Agreements agreements={sortedAgreements} />;
}
