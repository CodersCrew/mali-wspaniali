import firebase from 'firebase/app';

export type OnSnapshotCallback = (
  data: firebase.firestore.DocumentData,
) => void;

export const userRepository = (firestore: firebase.firestore.Firestore) => ({
  getUserById: (id: string, onSnapshotCallback: OnSnapshotCallback) => {
    return firestore
      .collection('user')
      .doc(id)
      .onSnapshot(snapshot => {
        const parentData = snapshot.data();
        if (parentData) {
          onSnapshotCallback(parentData);
        }
      });
  },
});
