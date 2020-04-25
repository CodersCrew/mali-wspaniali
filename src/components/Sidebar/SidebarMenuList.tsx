import React from 'react';
import { makeStyles, Avatar, MenuList } from '@material-ui/core/';
import { Home, FormatListBulletedSharp, Notifications, BuildSharp } from '@material-ui/icons/';
import { useTranslation } from 'react-i18next';
import { Child } from '../../firebase/types';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getChildrenByUserId } from '../../queries/childQueries';
import { getCurrentUser } from '../../queries/userQueries';
import { SidebarMenuListPropTypes } from './types';

export const SidebarMenuList = ({ openSidebar }: SidebarMenuListPropTypes) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const currentUser = getCurrentUser();
    const children = useSubscribed<Child[]>((callback: OnSnapshotCallback<Child[]>) => {
        if (currentUser) {
            getChildrenByUserId(currentUser.uid, callback);
        }
    }, []) as Child[];

    const menuItems = [
        { name: t('navbar.news'), link: '/', icon: <Home /> },
        { name: t('navbar.messages'), link: '/', icon: <FormatListBulletedSharp /> },
        { name: t('navbar.settings'), link: '/', icon: <Notifications /> },
        { name: t('navbar.settings'), link: '/', icon: <BuildSharp /> },
    ];

    return (
        <MenuList>
            {children &&
                children.map(child => {
                    const { firstName, id, avatar } = child;
                    const iconComponent = (
                        <div className={classes.sidebarAvatarWrapper}>
                            <Avatar src={avatar} className={classes.sidebarAvatar} />
                        </div>
                    );
                    const link = `child/:${id}`;
                    menuItems.splice(1, 0, { name: `${firstName}`, link: `${link}`, icon: iconComponent });
                    return menuItems.map(menuItem => (
                        <SidebarMenuItem
                            openSidebar={openSidebar}
                            key={menuItem.name}
                            name={menuItem.name}
                            link={menuItem.link}
                            icon={menuItem.icon}
                        />
                    ));
                })}
        </MenuList>
    );
};

const useStyles = makeStyles({
    sidebarAvatarWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        width: 28,
        height: 28,
        background: '#FFFFFF',
    },
    sidebarAvatar: {
        width: 24,
        height: 24,
    },
});
