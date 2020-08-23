import React, { useEffect, useContext } from 'react';
import { activePage } from '../../apollo_client';
import { UserContext } from '../AppWrapper';
import { useParams } from 'react-router-dom';

export function RecomendationsPage() {
    const { childId } = useParams<{ childId: string }>();
    const user = useContext(UserContext);


    const child = user?.children.find(child => child._id === childId)

    useEffect(() => {
        if (child) {
            activePage([child.firstname, `/parent/child/${child._id}/recomendations`, 'parent-menu.child.recomendations']);
        }
    }, [child]);



    return <div>recomendations page</div>;
}
