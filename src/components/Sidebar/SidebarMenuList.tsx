import React from 'react';
import { makeStyles, Avatar, MenuList } from '@material-ui/core/';
import { Home, FormatListBulleted, Notifications, BuildSharp } from '@material-ui/icons/';
import { useTranslation } from 'react-i18next';
import { Child } from '../../firebase/types';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getChildrenByUserId } from '../../queries/childQueries';
import { getCurrentUser } from '../../queries/userQueries';
import { cardBackgroundColor } from '../../colors';
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
        { name: t('sidebar.home'), link: '/', icon: <Home /> },
        { name: t('sidebar.news'), link: '/parent/blog', icon: <FormatListBulleted /> },
        { name: t('sidebar.notifications'), link: '/', icon: <Notifications /> },
        { name: t('sidebar.settings'), link: '/', icon: <BuildSharp /> },
    ];

    return (
        <MenuList>
            {children.map(child => {
                const { firstName, id, avatar } = child;
                const iconComponent = (
                    <div className={classes.avatarWrapper}>
                        <Avatar src={avatar} className={classes.avatar} />
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
    avatarWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        width: 28,
        height: 28,
        cardBackgroundColor,
    },
    avatar: {
        width: 24,
        height: 24,
    },
});
