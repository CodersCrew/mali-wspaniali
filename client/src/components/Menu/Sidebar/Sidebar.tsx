import React from 'react';

import { AdminSidebar } from './AdminSidebar';
import { InstructorSidebar } from './InstructorSidebar';
import { ParentSidebar } from './ParentSidebar';
import { Me } from '../../../graphql/types';

interface Props {
    user: Me;
    activePage: string[];
    isOpen: boolean;
    onClick: (link?: string) => void;
    onSidebarClose: () => void;
}

export function Sidebar({ user, isOpen, activePage, onClick, onSidebarClose }: Props) {
    if (user.role === 'admin') {
        return (
            <AdminSidebar user={user} active={activePage} open={isOpen} onClose={onSidebarClose} onClick={onClick} />
        );
    }

    if (user.role === 'instructor') {
        return (
            <InstructorSidebar
                user={user}
                active={activePage}
                open={isOpen}
                onClose={onSidebarClose}
                onClick={onClick}
            />
        );
    }

    return <ParentSidebar user={user} active={activePage} open={isOpen} onClose={onSidebarClose} onClick={onClick} />;
}
