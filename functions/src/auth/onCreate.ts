import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const setParentRole = functions.firestore
  .document('user/{userId}')
  .onCreate((event, context) => {
    const { userId } = context.params;
    const userRef = admin
      .firestore()
      .collection('user')
      .doc(userId);
    return userRef.update({ role: 'Parent' });
  });
