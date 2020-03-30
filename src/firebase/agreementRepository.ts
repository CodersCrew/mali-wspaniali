import firebaseApp from 'firebase/app';
import { Agreements } from './types';
import { OnSnapshotCallback } from './userRepository';
import { logQuery } from '../utils/logQuery';

type dataPromiseTypes = {
  agreements: Agreements[];
  unsubscribe: () => void;
};

export const agreementRepository = (db: firebaseApp.firestore.Firestore) => ({
    getAgreementDocById: (
      agreementId: string,
      onSnapshotCallback: OnSnapshotCallback<Agreements>,
    ) => {
      db.collection('agreement')
        .doc(agreementId)
        .onSnapshot(snapshot => {
          logQuery(snapshot);
          const agreementData = snapshot.data() as Agreements;
          if (agreementData) {
            onSnapshotCallback(agreementData);
          }
        });
    },
    getAgreementsDatas: //(): Promise<dataPromiseTypes> 
    () => {
        const agreements: Agreements[] = [];
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
          if (!snapshot.empty) {
              snapshot.forEach(doc => {
              const docData = doc.data() as Agreements;
              agreements.push(docData);
            });
          } 
            };
    const getQuery = (
      resolve: (value: dataPromiseTypes) => void,
      reject: (reason: Error) => void,
    ): (() => void) => {
      const agreementRefWithLimit = db
        .collection('agreement')
        .orderBy('required');
      const unsubscribe = agreementRefWithLimit.onSnapshot(
        snapshot => {
          logQuery(snapshot);
          handleData(snapshot);
          resolve({
            agreements,
            unsubscribe,
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