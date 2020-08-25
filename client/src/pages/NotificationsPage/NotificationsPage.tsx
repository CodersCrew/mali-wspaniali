import React, { useContext, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { NotificationPageHeader } from './NotificationPageHeader';
import { NotificationPageList } from './NotificationPageList';
import { Pagination } from '../ArticleListPage/Pagination';
import { UserContext } from '../AppWrapper';
import { activePage } from '../../apollo_client';

export const NotificationsPage = () => {
    const user = useContext(UserContext);

    useEffect(() => {
        activePage(['admin-menu.notifications', 'parent-menu.notifications']);
    }, []);

    if (!user) return null;

    const { notifications } = user;

    return (
        <Container maxWidth="xl">
            <NotificationPageHeader />
            <NotificationPageList notifications={notifications} />
            <Pagination disabledPrevious={true} disabledNext={true} handleChange={() => true}></Pagination>
        </Container>
    );
};
