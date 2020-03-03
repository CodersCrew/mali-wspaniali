import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import { Document } from './types';

type dataPromiseTypes = {
  documents: Document[];
  loading: boolean;
  unsubscribe: () => void;
  newLastVisible: Document | null;
  newFirstVisible: Document | null;
};

export const childRepository = (db: firebaseApp.firestore.Firestore) => ({
  getChildrenData: (
    rowsPerPage: number,
    previousLastVisible: Document | null,
    previousFirstVisible: Document | null,
  ): Promise<dataPromiseTypes> => {
    const documents: Document[] = [];
    let loading = true;
    let newFirstVisible: Document | null = null;
    let newLastVisible: Document | null = null;
    const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
      if (!snapshot.empty) {
        [newFirstVisible] = snapshot.docs;
        newLastVisible = snapshot.docs[snapshot.docs.length - 1];
        loading = false;
        snapshot.forEach(doc => {
          documents.push(doc.data());
        });
      } else {
        [newFirstVisible] = snapshot.docs;
        newLastVisible = snapshot.docs[snapshot.docs.length - 1];
        loading = false;
      }
    };
    const getQuery = (
      resolve: (value: dataPromiseTypes) => void,
      reject: (reason: Error) => void,
    ): (() => void) => {
      const childRefWithLimit = db
        .collection('child')
        .orderBy('lastName')
        .limit(rowsPerPage);
      if (previousLastVisible && !previousFirstVisible) {
        const unsubscribe = childRefWithLimit
          .startAfter(previousLastVisible)
          .onSnapshot(
            snapshot => {
              handleData(snapshot);
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
        return unsubscribe;
      }
      if (!previousLastVisible && previousFirstVisible) {
        const unsubscribe = childRefWithLimit
          .endBefore(previousFirstVisible)
          .onSnapshot(
            snapshot => {
              handleData(snapshot);
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
        return unsubscribe;
      }
      const unsubscribe = childRefWithLimit.onSnapshot(
        snapshot => {
          handleData(snapshot);
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
      return unsubscribe;
    };
    return new Promise<dataPromiseTypes>((resolve, reject) => {
      getQuery(resolve, reject);
    });
  },
});
