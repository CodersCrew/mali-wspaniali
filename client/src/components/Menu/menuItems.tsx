import React from 'react';
import {
    Home,
    Notifications,
    FormatListBulleted,
    BuildSharp,
    Assessment,
    AssignmentTurnedIn,
    Message,
    Archive,
} from '@material-ui/icons/';
import { TFunction } from 'i18next';

export const getMenuItems = (t: TFunction, userRole: string) => {
    const adminMenuItems = [
        { name: t('menu.home'), link: '/admin', icon: <Home /> },
        { name: t('menu.results'), link: '/admin/tests', icon: <Assessment /> },
        { name: t('menu.agreements'), link: '/admin/agreements', icon: <AssignmentTurnedIn /> },
        { name: t('menu.newsletter'), link: '/admin/newsletter', icon: <Message /> },
        { name: t('menu.newsletter-archive'), link: '/admin/newsletter', icon: <Archive /> },
        { name: t('menu.blog'), link: '/parent/blog/all', icon: <FormatListBulleted /> },
        { name: t('menu.settings'), link: '/admin/settings', icon: <BuildSharp /> },
    ];

    const parentMenuItems = [
        { name: t('menu.home'), link: '/parent', icon: <Home /> },
        { name: t('menu.news'), link: '/parent/blog/all', icon: <FormatListBulleted /> },
        { name: t('menu.notifications'), link: '/parent/notifications', icon: <Notifications /> },
        { name: t('menu.settings'), link: '/parent/settings', icon: <BuildSharp /> },
    ];

    return userRole === 'parent' ? parentMenuItems : adminMenuItems;
};
