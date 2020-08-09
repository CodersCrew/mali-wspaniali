import firebaseApp from 'firebase/app';

export const notificationRepository = (db: firebaseApp.firestore.Firestore) => ({
    setNotificationReadValue: (userId: string, notificationId: string, value: boolean) => {
        return db
            .collection('user')
            .doc(userId)
            .collection('notifications')
            .doc(notificationId)
            .update({ isRead: value });
    },
});
