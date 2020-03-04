import firebase from 'firebase/app';

export type ChildData = firebase.firestore.DocumentSnapshot<
  firebase.firestore.DocumentData
>;

export interface Child {
  firstName?: string;
  lastName?: string;
  userId?: string;
}

export const childRepository = (firestore: firebase.firestore.Firestore) => ({
  getChildDocById: (
    childId: string,
    successCallback: (childDoc: ChildData) => void,
    failCallback: (message: string) => void,
  ) =>
    firestore
      .collection('child')
      .doc(childId)
      .onSnapshot(childDoc => {
        if (childDoc.data()) successCallback(childDoc);
        else failCallback('child-profile.no-child');
      }),
});
