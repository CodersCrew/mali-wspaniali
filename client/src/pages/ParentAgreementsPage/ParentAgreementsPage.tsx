import { useEffect } from 'react';
import { activePage } from '../../apollo_client';
import { Agreements } from './Agreements';
import { useMe } from '../../utils/useMe';

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
