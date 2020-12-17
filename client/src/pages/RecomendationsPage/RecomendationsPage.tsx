import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';

export function RecomendationsPage() {
    const { childId } = useParams<{ childId: string }>();
    const user = useMe();

    const child = user?.children.find(({ _id }) => _id === childId);

    useEffect(() => {
        if (child) {
            activePage([
                child.firstname,
                `/parent/child/${child._id}/recomendations`,
                'parent-menu.child.recomendations',
            ]);
        }
    }, [child]);

    return <div>recomendations page</div>;
}
