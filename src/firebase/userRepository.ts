import firebaseApp from 'firebase/app';
import { Document } from './types';

export const userRepository = (db: firebaseApp.firestore.Firestore) => ({
  getUsersFirstPage: (rowsPerPage: number) => {
    db.collection('user')
      .get()
      .then(snap => snap.forEach(doc => console.log(doc.data())));
    const documents: Document[] = [];
    const unsubscribe = db
      .collection('user')
      .orderBy('role')
      .limit(rowsPerPage)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          documents.push(doc.data());
        });
      });
      return { documents, unsubscribe };
  },

  getUsersPaginated: (
    rowsPerPage: number,
    previousLastVisible: Document | null,
    previousFirstVisible: Document | null,
  ) => {
    const documents: Document[] = [];
    const getFunction = () => {
      if (previousFirstVisible) {
        return () =>
          db
            .collection('user')
            .orderBy('lastName')
            .limit(rowsPerPage)
            .endBefore(previousFirstVisible)
            .onSnapshot({ includeMetadataChanges: true }, snapshots => {
              snapshots.docs.forEach(doc => documents.push(doc.data()));
            });
      }
      return () =>
        db
          .collection('child')
          .orderBy('lastName')
          .limit(rowsPerPage)
          .startAfter(previousLastVisible)
          .onSnapshot({ includeMetadataChanges: true }, snapshots => {
            snapshots.docs.forEach(doc => documents.push(doc.data()));
          });
    };
    const unsubscribe = getFunction();
    const newFirstVisible: Document = documents[0];
    const newLastVisible: Document = documents[documents.length - 1];
    return { documents, unsubscribe, newLastVisible, newFirstVisible };
  },
});
