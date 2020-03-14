import firebaseApp from 'firebase/app';
import { OnSnapshotCallback } from './userRepository';
import { logQuery } from '../utils/logQuery';

export interface Child {
  firstName: string;
  lastName: string;
  userId: string;
}

export const childRepository = (db: firebaseApp.firestore.Firestore) => ({
  getChildDocById: (
    childId: string,
    onSnapshotCallback: OnSnapshotCallback<Child>,
  ) => {
    db.collection('child')
      .doc(childId)
      .onSnapshot(snapshot => {
        logQuery(snapshot);
        const childData = snapshot.data() as Child;
        if (childData) {
          onSnapshotCallback(childData);
        }
      });
  },
});
