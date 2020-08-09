import { firebase } from '../firebase/firebase';

export const setNotificationReadValue = (userId: string, notificationId: string, value: boolean) => {
    return firebase.notification.setNotificationReadValue(userId, notificationId, value);
};
