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
    /*db.collection('user')
      .get()
      .then(snap => snap.forEach(doc => console.log(doc.data())));
    const documents: Document[] = [];
    let loading: boolean = true;
    const unsubscribe = db
      .collection('user')
      .orderBy('role')
      .limit(rowsPerPage)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          documents.push(doc.data());
        });
      });
    return { documents, unsubscribe, loading };
    */
    return new Promise<initialPromiseTypes>((resolve, reject) => {
      const documents: Document[] = [];
      let loading: boolean = true;
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
    /*const documents: Document[] = [];
    const getQuery = () => {
      if (previousFirstVisible) {
        return () =>
          db
            .collection('user')
            .orderBy('lastName')
            .limit(rowsPerPage)
            .endBefore(previousFirstVisible)
            .onSnapshot(snapshots => {
              snapshots.docs.forEach(doc => documents.push(doc.data()));
            });
      }
      return () =>
        db
          .collection('child')
          .orderBy('lastName')
          .limit(rowsPerPage)
          .startAfter(previousLastVisible)
          .onSnapshot(snapshots => {
            snapshots.docs.forEach(doc => documents.push(doc.data()));
          });
    };
    const unsubscribe = getQuery();
    const newFirstVisible: Document = documents[0];
    const newLastVisible: Document = documents[documents.length - 1];
    return { documents, unsubscribe, newLastVisible, newFirstVisible };
    */
    return new Promise<paginationPromiseTypes>((resolve, reject) => {
      const documents: Document[] = [];
      let loading: boolean = true;
      let newFirstVisible: Document = documents[0];
      let newLastVisible: Document = documents[documents.length - 1];
      if (previousFirstVisible) {
        const unsubscribe = db
          .collection('user')
          .orderBy('lastName')
          .limit(rowsPerPage)
          .endBefore(previousFirstVisible)
          .onSnapshot(
            snapshot => {
              if (!snapshot.empty) {
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
          );;
      }
    });
  },
});
