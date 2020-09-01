import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { activePage } from '../../apollo_client';
import { UserContext } from '../AppWrapper';

export function ChildDetailsPage() {
    const { childId } = useParams<{ childId: string }>();
    const user = useContext(UserContext);


    const child = user?.children.find(({ _id }) => _id === childId)

    useEffect(() => {
        if (child) {
            activePage([child.firstname, `/parent/child/${child._id}/child-details`, 'parent-menu.child.child-details']);
        }
    }, [child]);
 

    return <div>child details page</div>;
}
