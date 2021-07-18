import React from 'react';
import { useMe } from '../utils/useMe';
import { openUpdateInstructorNameModal } from '../components/Instructor/UpdateInstructorNameModal';

export const InstructorWrapper: React.FC = ({ children }) => {
    const user = useMe();

    if (!user) return null;
    if (user.role !== 'instructor') return null;

    const { firstname, lastname } = user;

    // TODO: remove!
    console.log('firstname:', firstname);
    console.log('lastname:', lastname);

    if (!firstname || !lastname) {
        openUpdateInstructorNameModal({ lastname, firstname }).then((result) => {
            if (result.decision && result.decision.accepted) {
                console.log('result:', result);
            }
        });
    }

    return <>{children}</>;
};
