import firebaseApp from 'firebase/app';
import { Document } from './types';

type initialPromiseTypes = {
  documents: Document[];
  loading: boolean;
  unsubscribe: () => void;
  lastVisible: Document | null;
};

type paginationPromiseTypes = {
  documents: Document[];
  loading: boolean;
  unsubscribe: () => void;
  newLastVisible: Document | null;
  newFirstVisible: Document | null;
};

export const userRepository = (db: firebaseApp.firestore.Firestore) => ({
  getUsersFirstPage: (rowsPerPage: number) => {
    return new Promise<initialPromiseTypes>((resolve, reject) => {
      const documents: Document[] = [];
      let loading = true;
      let lastVisible: Document | null = null;
      const unsubscribe = db
        .collection('user')
        .orderBy('role')
        .limit(rowsPerPage)
        .onSnapshot(
          snapshot => {
            if (!snapshot.empty) {
              lastVisible = snapshot.docs[snapshot.docs.length - 1];
              loading = false;
              snapshot.forEach(doc => {
                documents.push(doc.data());
              });
            }
            resolve({ documents, unsubscribe, loading, lastVisible });
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  },

  getUsersPaginated: (
    rowsPerPage: number,
    previousLastVisible: Document | null,
    previousFirstVisible: Document | null,
  ) => {
    return new Promise<paginationPromiseTypes>((resolve, reject) => {
      const documents: Document[] = [];
      let loading = true;
      let newFirstVisible: Document | null = null;
      let newLastVisible: Document | null = null;
      if (previousFirstVisible) {
        const unsubscribe = db
          .collection('user')
          .orderBy('lastName')
          .limit(rowsPerPage)
          .endBefore(previousFirstVisible)
          .onSnapshot(
            snapshot => {
              if (!snapshot.empty) {
                [newFirstVisible] = snapshot.docs;
                newLastVisible = snapshot.docs[snapshot.docs.length - 1];
                loading = false;
                snapshot.forEach(doc => {
                  documents.push(doc.data());
                });
              }
              resolve({
                documents,
                unsubscribe,
                loading,
                newLastVisible,
                newFirstVisible,
              });
            },
            (error: Error) => {
              reject(error);
            },
          );
      } else {
        const unsubscribe = db
          .collection('child')
          .orderBy('lastName')
          .limit(rowsPerPage)
          .startAfter(previousLastVisible)
          .onSnapshot(
            snapshot => {
              if (!snapshot.empty) {
                [newFirstVisible] = snapshot.docs;
                newLastVisible = snapshot.docs[snapshot.docs.length - 1];
                loading = false;
                snapshot.forEach(doc => {
                  documents.push(doc.data());
                });
              }
              resolve({
                documents,
                unsubscribe,
                loading,
                newLastVisible,
                newFirstVisible,
              });
            },
            (error: Error) => {
              reject(error);
            },
          );
      }
    });
  },
});
