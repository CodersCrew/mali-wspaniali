import React from 'react';
import { Home, Notifications, FormatListBulleted, BuildSharp, Assessment, AssignmentTurnedIn, Message, Archive } from '@material-ui/icons/';
import i18n from 'i18next';


export const adminStaticMenuItems = [
    { name: i18n.t('menu.home'), link: '/parent', icon: <Home /> },
    { name: i18n.t('menu.results'), link: '/admin/tests', icon: <Assessment /> },
    { name: i18n.t('menu.agreements'), link: '/admin/agreements', icon: <AssignmentTurnedIn /> },
    { name: i18n.t('menu.newsletter'), link: '/admin/newsletter', icon: <Message /> },
    { name: i18n.t('menu.newsletter-archive'), link: '/admin/newsletter', icon: <Archive /> },
    { name: i18n.t('menu.blog'), link: '/admin/blog', icon: <FormatListBulleted /> },
    { name: i18n.t('menu.settings'), link: '/admin/settings', icon: <BuildSharp /> },
];

export const parentStaticMenuItems = [
    { name: i18n.t('menu.home'), link: '/parent', icon: <Home /> },
    { name: i18n.t('menu.news'), link: '/parent/blog', icon: <FormatListBulleted /> },
    { name: i18n.t('menu.notifications'), link: '/', icon: <Notifications /> },
    { name: i18n.t('menu.settings'), link: '/', icon: <BuildSharp /> },
];