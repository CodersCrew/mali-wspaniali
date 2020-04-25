import React from 'react';
import { Avatar } from '@material-ui/core/';
import { Home, FormatListBulletedSharp, Notifications, BuildSharp } from '@material-ui/icons/';
import { useTranslation } from 'react-i18next';
import { Child } from '../../firebase/types';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getChildrenByUserId } from '../../queries/childQueries';
import { getCurrentUser } from '../../queries/userQueries';

export const SidebarMenuList = (openSidebar: any) => {
    const { t } = useTranslation();
    const currentUser = getCurrentUser();
    const children = useSubscribed<Child[]>((callback: OnSnapshotCallback<Child[]>) => {
        if (currentUser) {
            getChildrenByUserId(currentUser.uid, callback);
        }
    }, []) as Child[];

    const staticMenuItems = [
        { name: t('navbar.news'), link: '/parent/blog', icon: <Home /> },
        { name: t('navbar.messages'), link: '/', icon: <FormatListBulletedSharp /> },
        { name: t('navbar.settings'), link: '/', icon: <Notifications /> },
        { name: t('navbar.settings'), link: '/', icon: <BuildSharp /> },
    ];

    return (
        <>
            <div>
                {children.map(child => {
                    // Tutaj połączyć tablice
                    const { firstName, id, avatar } = child;
                    const iconComponent = <Avatar src={avatar} />;
                    const link = `child/:${id}`;
                    console.log(staticMenuItems, { firstName });
                    return (
                        <SidebarMenuItem
                            key={firstName}
                            openSidebar={openSidebar}
                            name={firstName}
                            link={link}
                            icon={iconComponent}
                        />
                    );
                })}
            </div>
        </>
    );
};
