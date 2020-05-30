import { firebase } from '../firebase/firebase';
import { Notification } from '../firebase/types';
import { OnSnapshotCallback } from '../firebase/userRepository';

export const getUserNotifications = async (userId: string, onSnapshotCallback: OnSnapshotCallback<Notification[]>) => {
    return await firebase.notification.getUserNotifications(userId, onSnapshotCallback);
};