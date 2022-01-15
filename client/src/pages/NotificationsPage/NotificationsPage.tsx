import React from 'react';
import { NotificationPageList } from './NotificationPageList';
import { activePage } from '../../apollo_client';
import { useMe } from '../../utils/useMe';
import { useReadNotification } from '../../operations/mutations/Notification/readNotification';
import { PageContainer } from '../../components/PageContainer';

export default function NotificationsPage() {
    const user = useMe();
    const { readNotification } = useReadNotification();

    React.useEffect(() => {
        activePage(['admin-menu.notifications', 'parent-menu.notifications', 'instructor-menu.notifications']);
    }, []);

    if (!user) return null;

    return (
        <PageContainer>
            <NotificationPageList onClick={(id) => readNotification(id)} notifications={user.notifications} />
        </PageContainer>
    );
}
