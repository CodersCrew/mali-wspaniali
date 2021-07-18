import React, { useEffect } from 'react';
import { useMe } from '../utils/useMe';
import { openUpdateInstructorNameModal } from '../components/Instructor/UpdateInstructorNameModal';
import { useUpdateUser } from '../operations/mutations/User/useUpdateUser';

export const InstructorWrapper: React.FC = ({ children }) => {
    const user = useMe();
    const { updateUser } = useUpdateUser();

    useEffect(() => {
        if (user?.role !== 'instructor') return;

        const { firstname, lastname, mail } = user;

        if (!firstname || !lastname) {
            openUpdateInstructorNameModal({ lastname, firstname, mail }).then((result) => {
                if (result.decision && result.decision.accepted) {
                    updateUser(result.decision.name);
                }
            });
        }
    }, [user?.firstname, user?.lastname]);

    return <>{children}</>;
};
