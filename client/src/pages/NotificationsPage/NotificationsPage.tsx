import React, { useEffect } from 'react';

import { Pagination } from '../ArticleListPage/Pagination';
import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';
import { useReadNotification } from '../../operations/mutations/Notification/readNotification';
import { PageContainer } from '../../components/PageContainer';

import { NotificationPageList } from './NotificationPageList';

export default function NotificationsPage() {
    const user = useMe();
    const { readNotification } = useReadNotification();

    useEffect(() => {
        activePage(['admin-menu.notifications', 'parent-menu.notifications', 'instructor-menu.notifications']);
    }, []);

    if (!user) return null;

    return (
        <PageContainer>
            <NotificationPageList onClick={(id) => readNotification(id)} notifications={user.notifications} />
            <Pagination disabledPrevious={true} disabledNext={true} handleChange={() => true}></Pagination>
        </PageContainer>
    );
}
