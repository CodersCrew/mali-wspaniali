import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import { Document } from './types';

export const childRepository = (db: firebaseApp.firestore.Firestore) => ({
  getChildrenFirstPage: (rowsPerPage: number) => {
    const documents: Document[] = [];
    const lastVisible: Document[] = [];
    const unsubscribe = () =>
      db
        .collection('child')
        .orderBy('lastName')
        .limit(rowsPerPage)
        .onSnapshot({ includeMetadataChanges: true }, snapshots => {
          snapshots.docs.forEach(doc => documents.push(doc.data()));
          lastVisible.push(snapshots.docs[snapshots.docs.length - 1]);
        });
    return { documents, unsubscribe, lastVisible };
  },
  getChildrenNextPage: (rowsPerPage: number, previousLastVisible: Document) => {
    const documents: Document[] = [];
    const newLastVisible: Document[] = [];
    const unsubscribe = () =>
      db
        .collection('child')
        .orderBy('lastName')
        .limit(rowsPerPage)
        .startAfter(previousLastVisible)
        .onSnapshot({ includeMetadataChanges: true }, snapshots => {
          snapshots.docs.forEach(doc => documents.push(doc.data()));
          newLastVisible.push(snapshots.docs[snapshots.docs.length - 1]);
        });
    return { documents, unsubscribe, newLastVisible };
  },
  getChildrenPrevPage: (rowsPerPage: number, previousLastVisible: Document) => {
    const documents: Document[] = [];
    const newLastVisible: Document[] = [];
    const unsubscribe = () =>
      db
        .collection('child')
        .orderBy('lastName')
        .limit(rowsPerPage)
        .endBefore(previousLastVisible)
        .onSnapshot({ includeMetadataChanges: true }, snapshots => {
          snapshots.docs.forEach(doc => documents.push(doc.data()));
          newLastVisible.push(snapshots.docs[snapshots.docs.length - 1]);
        });
    return { documents, unsubscribe, newLastVisible };
  },
});
