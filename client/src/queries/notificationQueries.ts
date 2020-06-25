import { firebase } from '../firebase/firebase';
import { Snapshot, NotificationPaginatedList } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const getNotificationData = (
    onSnapshotCallback: OnSnapshotCallback<NotificationPaginatedList>,
    userId: string,
    limit: number,
    startAfter?: Snapshot,
    endBefore?: Snapshot,
) => {
    return firebase.notification.getNotificationData(onSnapshotCallback, userId, limit, startAfter, endBefore);
};

export const setNotificationReadValue = (userId: string, notificationId: string, value: boolean) => {
    return firebase.notification.setNotificationReadValue(userId, notificationId, value);
};
