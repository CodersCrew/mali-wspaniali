import * as admin from 'firebase-admin';

export const authRepository = (userId: string) => ({
  setParentRole: () => {
    return admin
      .firestore()
      .collection('user')
      .doc(userId)
      .update({ role: 'Parent' });
  },
});
