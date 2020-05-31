import { firebase } from '../firebase/firebase';
import { Notification, Snapshot, NotificationPaginatedList } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const getUserNotifications = async (userId: string, notificationLimit: number, onSnapshotCallback: OnSnapshotCallback<Notification[]>) => {
    return await firebase.notification.getUserNotifications(userId, notificationLimit, onSnapshotCallback);
};

export const getNotificationData = async (onSnapshotCallback: OnSnapshotCallback<NotificationPaginatedList>, userId: string, limit: number, startAfter?: Snapshot, endBefore?: Snapshot) => {
    return await firebase.notification.getNotificationData(onSnapshotCallback, userId, limit, startAfter, endBefore)
}