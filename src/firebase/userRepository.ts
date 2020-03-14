import firebaseApp from 'firebase/app';
import { Document } from './types';

type dataPromiseTypes = {
  documents: Document[];
  unsubscribe: () => void;
  newLastVisible: Document | null;
  newFirstVisible: Document | null;
};

export const userRepository = (db: firebaseApp.firestore.Firestore) => ({
  getUsersData: (
    rowsPerPage: number,
    previousLastVisible: Document | null,
    previousFirstVisible: Document | null,
  ): Promise<dataPromiseTypes> => {
    const documents: Document[] = [];
    let newFirstVisible: Document | null = null;
    let newLastVisible: Document | null = null;
    const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
      if (!snapshot.empty) {
        [newFirstVisible] = snapshot.docs;
        newLastVisible = snapshot.docs[snapshot.docs.length - 1];
        snapshot.forEach(doc => {
          documents.push(doc.data());
          documents[documents.length - 1].id = doc.id;
        });
      } else {
        [newFirstVisible] = snapshot.docs;
        newLastVisible = snapshot.docs[snapshot.docs.length - 1];
      }
    };
    const getQuery = (
      resolve: (value: dataPromiseTypes) => void,
      reject: (reason: Error) => void,
    ): (() => void) => {
      const userRefWithLimit = db
        .collection('user')
        .orderBy('role')
        .limit(rowsPerPage);
      if (previousLastVisible && !previousFirstVisible) {
        const unsubscribe = userRefWithLimit
          .startAfter(previousLastVisible)
          .onSnapshot(
            snapshot => {
              handleData(snapshot);
              resolve({
                documents,
                unsubscribe,
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
        const unsubscribe = userRefWithLimit
          .endBefore(previousFirstVisible)
          .onSnapshot(
            snapshot => {
              handleData(snapshot);
              resolve({
                documents,
                unsubscribe,
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
      const unsubscribe = userRefWithLimit.onSnapshot(
        snapshot => {
          handleData(snapshot);
          resolve({
            documents,
            unsubscribe,
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
