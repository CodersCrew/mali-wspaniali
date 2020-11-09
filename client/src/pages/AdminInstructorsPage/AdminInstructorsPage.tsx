import React, { useEffect } from 'react';
import { InstructorsTable } from './InstructorsTable/InstructorsTable';
import { activePage } from '../../apollo_client';
import { useUsersByRole } from '../../operations/queries/Users/getUsersByRole';

export function AdminInstructorsPage() {
    const { usersList } = useUsersByRole('instructor');

    useEffect(() => {
        activePage(['admin-menu.access.title', 'admin-menu.access.instructors']);
    }, []);

    console.log(usersList);

    return (
        <div>
            <InstructorsTable instructors={usersList} />
        </div>
    );
}
