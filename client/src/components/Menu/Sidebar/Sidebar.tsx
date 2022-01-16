import { AdminSidebar } from './AdminSidebar';
import { InstructorSidebar } from './InstructorSidebar';
import { ParentSidebar } from './ParentSidebar';
import { Me } from '@app/graphql/types';
import { useSidebarState } from '../../../utils/useSidebar';

interface Props {
    user: Me;
    activePage: string[];
    onClick: (link?: string) => void;
}

export function Sidebar({ user, activePage, onClick }: Props) {
    const sidebarState = useSidebarState();
    const RoleAwareSidebar = calculateSidebar();

    return <RoleAwareSidebar user={user} active={activePage} onClick={onElementClick} />;

    function onElementClick(link?: string) {
        sidebarState.closeSidebar();

        onClick(link);
    }

    function calculateSidebar() {
        if (user.role === 'admin') return AdminSidebar;

        if (user.role === 'instructor') return InstructorSidebar;

        return ParentSidebar;
    }
}
