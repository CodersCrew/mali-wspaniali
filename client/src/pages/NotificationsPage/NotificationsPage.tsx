import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { NotificationPageHeader } from './NotificationPageHeader';
import { NotificationPageList } from './NotificationPageList';
import { Pagination } from '../BlogMainPage/Pagination';
import { UserContext } from '../AppWrapper/AppWrapper';

export const NotificationsPage = () => {
    // const [notificationData, setNotificationData] = useState<Notification[]>();
    // const [notificationPaginatedList, setNotificationPaginatedList] = useState<NotificationPaginatedList>();
    // const [isLastPage, setIsLastPage] = useState(false);
    // const [isFirstPage, setIsFirstPage] = useState(true);
    const user = useContext(UserContext);

    // useEffect(() => {
    //     if (currentUser) {
    //         addNotificationsToState(currentUser.uid, 9);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentUser]);

    // const addNotificationsToState = (userId: string, limit: number, startAfter?: Snapshot, endBefore?: Snapshot) => {
    //     getNotificationData(
    //         notificationsFromSnapshot => {
    //             setNotificationData(notificationsFromSnapshot.notifications as any);
    //             setNotificationPaginatedList(notificationsFromSnapshot);
    //             setupPagination(notificationsFromSnapshot, startAfter, endBefore);
    //         },
    //         userId,
    //         limit,
    //         startAfter,
    //         endBefore,
    //     );
    // };

    // const setupPagination = (
    //     notificationsFromSnapshot: NotificationPaginatedList,
    //     startAfter?: Snapshot,
    //     endBefore?: Snapshot,
    // ) => {
    //     if (!startAfter && !endBefore) {
    //         setIsFirstPage(true);
    //         setIsLastPage(false);
    //         if (!notificationsFromSnapshot.isMore) {
    //             setIsLastPage(true);
    //         }
    //     } else {
    //         if (startAfter) {
    //             setIsFirstPage(false);
    //         }
    //         if (endBefore) {
    //             setIsLastPage(false);
    //         }
    //         if (!notificationsFromSnapshot.isMore && startAfter) {
    //             setIsLastPage(true);
    //         }
    //         if (!notificationsFromSnapshot.isMore && endBefore) {
    //             setIsFirstPage(true);
    //         }
    //     }
    // };

    // const paginationQuery = (paginationDirection: string) => {
    //     if (!notificationPaginatedList) return;
    //     const startAfter = paginationDirection === 'next' ? notificationPaginatedList.lastSnap : undefined;
    //     const endBefore = paginationDirection === 'prev' ? notificationPaginatedList.firstSnap : undefined;
    //     if (currentUser) {
    //         addNotificationsToState(currentUser.uid, 9, startAfter, endBefore);
    //     }
    // };

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
