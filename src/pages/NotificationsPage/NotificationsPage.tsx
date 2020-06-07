import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import { NotificationPageHeader } from './NotificationPageHeader'
import { NotificationPageList } from './NotificationPageList'
import { Snapshot, NotificationPaginatedList, Notification } from '../../firebase/types';
import { getNotificationData } from '../../queries/notificationQueries'
import { useAuthorization } from '../../hooks/useAuthorization';
import { Pagination } from '../BlogMainPage/Pagination';

export const NotificationsPage = () => {
    const [notificationData, setNotificationData] = useState<Notification[]>();
    const [notificationPaginatedList, setNotificationPaginatedList] = useState<NotificationPaginatedList>()
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const currentUser = useAuthorization(true);

    useEffect(() => {
        if(currentUser) {
            addNotificationsToState(currentUser.uid, 9)
        }
    }, [currentUser])

    const addNotificationsToState = (userId: string, limit: number, startAfter?: Snapshot, endBefore?: Snapshot) => {
        getNotificationData(
            notificationsFromSnapshot => {
                setNotificationData(notificationsFromSnapshot.notifications);
                setNotificationPaginatedList(notificationsFromSnapshot)
                setupPagination(notificationsFromSnapshot, startAfter, endBefore);
            },
            userId,
            limit,
            startAfter,
            endBefore,
        );
    };

    const setupPagination = (
        notificationsFromSnapshot: NotificationPaginatedList,
        startAfter?: Snapshot,
        endBefore?: Snapshot,
    ) => {
        if (!startAfter && !endBefore) {
            setIsFirstPage(true);
            setIsLastPage(false);
            if (!notificationsFromSnapshot.isMore) {
                setIsLastPage(true);
            }
        } else {
            if (startAfter) {
                setIsFirstPage(false);
            }
            if (endBefore) {
                setIsLastPage(false);
            }
            if (!notificationsFromSnapshot.isMore && startAfter) {
                setIsLastPage(true);
            }
            if (!notificationsFromSnapshot.isMore && endBefore) {
                setIsFirstPage(true);
            }
        }
    };

    const paginationQuery = (paginationDirection: string) => {
        if (!notificationPaginatedList) return;
        const startAfter = paginationDirection === 'next' ? notificationPaginatedList.lastSnap : undefined;
        const endBefore = paginationDirection === 'prev' ? notificationPaginatedList.firstSnap : undefined;
        if(currentUser) {
            addNotificationsToState(currentUser.uid, 9, startAfter, endBefore);
        }
    };
    
    return (
        <Container maxWidth="xl">
            <NotificationPageHeader/>
            <NotificationPageList notifications={notificationData}/>
            <Pagination isFirst={isFirstPage} isLast={isLastPage} handleChange={paginationQuery}></Pagination>
        </Container>
    )
}