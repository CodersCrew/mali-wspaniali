import firebase from 'firebase/app';

export type OnSnapshotCallback = (
  snapshot: firebase.firestore.DocumentSnapshot,
) => void;

export const userRepository = (firestore: firebase.firestore.Firestore) => ({
  getUserById: (id: string, onSnapshotCallback: OnSnapshotCallback) => {
    return firestore
      .collection('user')
      .doc(id)
      .onSnapshot(onSnapshotCallback);
  },
});
