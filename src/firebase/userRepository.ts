import firebase from 'firebase/app';
import { Parent } from '../pages/ParentProfile/types';

export type OnSnapshotCallback<T extends firebase.firestore.DocumentData> = (
  data: T,
) => void;

export const userRepository = (firestore: firebase.firestore.Firestore) => ({
  getUserById: (id: string, onSnapshotCallback: OnSnapshotCallback<Parent>) => {
    return firestore
      .collection('user')
      .doc(id)
      .onSnapshot(snapshot => {
        const parentData = snapshot.data() as Parent;
        if (parentData) {
          onSnapshotCallback(parentData);
        }
      });
  },
});
