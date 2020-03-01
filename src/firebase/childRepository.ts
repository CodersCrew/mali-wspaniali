import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import { Document } from './types';

export const childRepository = (db: firebaseApp.firestore.Firestore) => ({
  getChildrenFirstPage: (rowsPerPage: number) => {
    const documents: Document[] = [];
    let lastVisible: Document | null = null;
    const unsubscribe = () =>
      db
        .collection('child')
        .orderBy('lastName')
        .limit(rowsPerPage)
        .onSnapshot({ includeMetadataChanges: true }, snapshots => {
          snapshots.docs.forEach(doc => documents.push(doc.data()));
        });
    lastVisible = documents[documents.length - 1];
    return { documents, unsubscribe, lastVisible };
  },

  getChildrenPaginated: (
    rowsPerPage: number,
    previousLastVisible: Document | null,
    previousFirstVisible: Document | null,
  ) => {
    const documents: Document[] = [];
    const getFunction = () => {
      if (previousFirstVisible) {
        return () =>
          db
            .collection('child')
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
