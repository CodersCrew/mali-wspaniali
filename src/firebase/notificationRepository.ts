import firebaseApp, { firestore } from 'firebase/app';
import { Notification, Snapshot, NotificationPaginatedList } from './types';
import { OnSnapshotCallback } from './userRepository';

export const notificationRepository = (db: firebaseApp.firestore.Firestore) => ({
    getNotificationData: (
        onSnapshotCallback: OnSnapshotCallback<NotificationPaginatedList>,
        userId: string,
        limit: number,
        startAfter?: Snapshot,
        endBefore?: Snapshot,
    ) => {
        let query = db
            .collection('user')
            .doc(userId)
            .collection('notifications')
            .limit(limit)
            .orderBy('date', 'desc') as firestore.Query;
        if (startAfter) {
            query = query.startAfter(startAfter).limit(limit);
        }
        if (endBefore) {
            query = query.endBefore(endBefore).limitToLast(limit);
        }
        query.onSnapshot(snapshot => {
            const notifications = [] as Notification[];
            const snapshots: Snapshot[] = [];
            let isMore = true;

            snapshot.forEach(snap => {
                snapshots.push(snap);
                const docData = snap.data() as Notification;
                docData.id = snap.ref.id;
                notifications.push(docData);
            });
            if (notifications.length < 9) {
                isMore = false;
            }
            let firstIndex = 0;
            let lastIndex = 8;
            if (endBefore && notifications.length > 8) {
                firstIndex = 1;
                lastIndex = 8;
            }
            return onSnapshotCallback({
                notifications: notifications.slice(firstIndex, lastIndex + 1),
                firstSnap: snapshots[firstIndex],
                lastSnap: snapshots[lastIndex],
                isMore,
            });
        });
    },
    setNotificationReadValue: (userId: string, notificationId: string, value: boolean) => {
        return db
            .collection('user')
            .doc(userId)
            .collection('notifications')
            .doc(notificationId)
            .update({ isRead: value });
    },
});
