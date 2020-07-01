import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { authRepository } from '../repository/authRepository';

export const setParentRole = functions.firestore.document('user/{userId}').onCreate((event, context) => {
    const { userId } = context.params;
    const parentRole = authRepository(userId).setParentRole();
    return parentRole;
});

export const createUser = functions.auth.user().onCreate(user => {
    return admin
        .firestore()
        .collection('user')
        .doc(user.uid)
        .set({ email: user.email });
});
