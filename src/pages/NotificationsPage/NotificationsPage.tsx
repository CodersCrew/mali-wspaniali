import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { NotificationPageHeader } from './NotificationPageHeader'
import { NotificationPageList } from './NotificationPageList'
import { Snapshot, NotificationPaginatedList } from '../../firebase/types';
import { User } from '../../firebase/firebase';
import { getNotificationData } from '../../queries/notificationQueries'
import { useAuthorization } from '../../hooks/useAuthorization';
import { Pagination } from '../BlogMainPage/Pagination';
import { useSubscribed } from '../../hooks/useSubscribed';
import { OnSnapshotCallback } from '../../firebase/userRepository';

export const NotificationsPage = () => {
    // const [notificationData, setNotificationData] = useState<Notification[]>();
    // const [notificationPaginatedList, setNotificationPaginatedList] = useState<NotificationPaginatedList>()
    const [isLastPage, setIsLastPage] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const currentUser = useAuthorization(true);
    let notificationResponse = useSubscribed<NotificationPaginatedList, User | null>((callback: OnSnapshotCallback<NotificationPaginatedList>) => {
        if(currentUser) {
            getNotificationData(callback, currentUser.uid, 9)
        }
    }, [], [currentUser],
    ) as NotificationPaginatedList

    const addNotificationsToState = (userId: string, limit: number, startAfter?: Snapshot, endBefore?: Snapshot) => {
        getNotificationData(
            notificationsFromSnapshot => {
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
        if (!notificationResponse) return;
        const startAfter = paginationDirection === 'next' ? notificationResponse.lastSnap : undefined;
        const endBefore = paginationDirection === 'prev' ? notificationResponse.firstSnap : undefined;
        if(currentUser) {
            addNotificationsToState(currentUser.uid, 9, startAfter, endBefore);
        }
    };
    
    return (
        <Container maxWidth="xl">
            <NotificationPageHeader/>
            <NotificationPageList notifications={notificationResponse.notifications}/>
            <Pagination isFirst={isFirstPage} isLast={isLastPage} handleChange={paginationQuery}></Pagination>
        </Container>
    )
}