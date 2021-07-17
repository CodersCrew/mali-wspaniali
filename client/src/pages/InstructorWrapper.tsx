import React from 'react';
import { useMe } from '../utils/useMe';
import { openAddInstructorNameModal } from '../components/Instructor/AddInstructorNameModal';

export const InstructorWrapper: React.FC = ({ children }) => {
    const user = useMe();

    if (!user) return null;
    if (user.role !== 'instructor') return null;

    const { firstname, lastname } = user;

    if (!firstname || !lastname) {
        openAddInstructorNameModal({ lastname, firstname }).then((result) => {
            if (result.decision && result.decision.accepted) {
                console.log('result:', result);
            }
        });
    }

    return <>{children}</>;
};
