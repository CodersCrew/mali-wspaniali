import firebaseApp from 'firebase/app';
import { Notification } from './types';
import { OnSnapshotCallback } from './userRepository';

export const notificationRepository = (db: firebaseApp.firestore.Firestore) => ({
    getUserNotifications: (userId: string, onSnapshotCallback: OnSnapshotCallback<Notification[]>) => {
        return db.collection('user').doc(userId).collection('notifications').onSnapshot(snapshot => {
            const notification = snapshot.docs.map(doc => {
                const notificationData = doc.data() as Notification
                return notificationData;
            })
            return onSnapshotCallback(notification)
        })
    }
})