import React, { useState } from 'react';
import { makeStyles, Avatar, MenuList } from '@material-ui/core/';
// import { Home, Notifications, FormatListBulleted, BuildSharp, Assessment, AssignmentTurnedIn, Message, Archive } from '@material-ui/icons/';

// import { useTranslation } from 'react-i18next';
import { User } from '../../firebase/firebase';
import { Child } from '../../firebase/types';
import { parentStaticMenuItems, adminStaticMenuItems } from '../Navbar/menuItems';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';
import { getChildrenByUserId } from '../../queries/childQueries';
import { onAuthStateChanged, getUserRole } from '../../queries/authQueries';
import { cardBackgroundColor } from '../../colors';
import { SidebarMenuListPropTypes } from './types';
import BoyAvatar from '../../assets/boy.png';
import GirlAvatar from '../../assets/girl.png';
import { useAuthorization } from '../../hooks/useAuthorization';

export const SidebarMenuList = ({ isSidebarOpen }: SidebarMenuListPropTypes) => {
    // const { t } = useTranslation();
    const classes = useStyles();
    const currentUser = useAuthorization(true);
    const [userRole, setUserRole] = useState('');

    onAuthStateChanged(async (user: User | null) => {
        if (user) {
            const role = await getUserRole(user);
            if (role) {
                setUserRole(role);
            }
        }
    });

    const children = useSubscribed<Child[], User | null>(
        (callback: OnSnapshotCallback<Child[]>) => {
            if (currentUser) {
                getChildrenByUserId(currentUser.uid, callback);
            }
        },
        [],
        [currentUser],
    ) as Child[];

    // const parentMenuItems = [
    //     { name: t('menu.home'), link: '/parent', icon: <Home /> },
    //     { name: t('menu.news'), link: '/parent/blog', icon: <FormatListBulleted /> },
    //     { name: t('menu.notifications'), link: '/', icon: <Notifications /> },
    //     { name: t('menu.settings'), link: '/', icon: <BuildSharp /> },
    // ];

    // const adminMenuItems = [
    //     { name: t('menu.home'), link: '/parent', icon: <Home /> },
    //     { name: t('menu.results'), link: '/admin/tests', icon: <Assessment /> },
    //     { name: t('menu.agreements'), link: '/admin/agreements', icon: <AssignmentTurnedIn /> },
    //     { name: t('menu.newsletter'), link: '/admin/newsletter', icon: <Message /> },
    //     { name: t('menu.newsletter-archive'), link: '/admin/newsletter/archive', icon: <Archive /> },
    //     { name: t('menu.blog'), link: '/admin/blog', icon: <FormatListBulleted /> },
    //     { name: t('menu.settings'), link: '/admin/settings', icon: <BuildSharp /> },
    // ];

    const menuItems = userRole === 'parent' ? [...parentStaticMenuItems] : [...adminStaticMenuItems];

    const renderMenuItems = () => {
        if (children) {
            children.map(({ firstName, id, sex }) => {
                const iconComponent = (
                    <div className={classes.avatarWrapper}>
                        <Avatar
                            src={sex === 'male' ? BoyAvatar : GirlAvatar}
                            className={classes.avatar}
                            variant="square"
                        />
                    </div>
                );
                const link = `/parent/child/${id}`;
                menuItems.splice(1, 0, { name: firstName, link, icon: iconComponent });
                return menuItems.map(({ name, link: itemLink, icon }) => (
                    <SidebarMenuItem isSidebarOpen={isSidebarOpen} key={name} name={name} link={itemLink} icon={icon} />
                ));
            });
        }
        return menuItems.map(({ name, link, icon }) => (
            <SidebarMenuItem isSidebarOpen={isSidebarOpen} key={name} name={name} link={link} icon={icon} />
        ));
    };

    return <MenuList>{renderMenuItems()}</MenuList>;
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
        '&> img': {
            objectFit: 'contain',
        },
    },
});
