import firebaseApp from 'firebase/app';

export interface Child {
  firstName?: string;
  lastName?: string;
  userId?: string;
}

export const childRepository = (db: firebaseApp.firestore.Firestore) => ({
  getChildDocById: (
    childId: string,
    successCallback: (childDoc: Child) => void,
    failCallback: (message: string) => void,
  ) =>
    db
      .collection('child')
      .doc(childId)
      .onSnapshot(childDoc => {
        if (childDoc.data()) successCallback(childDoc as Child);
        else failCallback('child-profile.no-child');
      }),
});
