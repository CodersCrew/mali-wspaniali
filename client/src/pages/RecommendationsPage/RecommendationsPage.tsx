import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';

export function RecommendationsPage() {
    const { childId } = useParams<{ childId: string }>();
    const user = useMe();


    const child = user?.children.find(({ _id }) => _id === childId)

    useEffect(() => {
        if (child) {
            activePage([child.firstname, `/parent/child/${child._id}/recommendations`, 'parent-menu.child.recommendations']);
        }
    }, [child]);



    return <div>recommendations page</div>;
}
