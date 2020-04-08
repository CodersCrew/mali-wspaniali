import firebaseApp from 'firebase/app';
import { AdminAgreement } from './types';
import { logQuery } from '../utils/logQuery';

type dataPromiseTypes = {
    agreement: AdminAgreement[];
    unsubscribe: () => void;
};

export const adminAgreementRepository = (db: firebaseApp.firestore.Firestore) => ({
    getAgreementListData: () => {
        const agreement: AdminAgreement[] = [];
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const docData = doc.data() as AdminAgreement;
                    docData.agreementId = doc.id;
                    agreement.push(docData);
                });
            }
        };
        const getQuery = (
            resolve: (value: dataPromiseTypes) => void,
            reject: (reason: Error) => void,
        ): (() => void) => {
            const agreementRef = db.collection('agreement').orderBy('required');
            const unsubscribe = agreementRef.onSnapshot(
                snapshot => {
                    logQuery(snapshot);
                    handleData(snapshot);
                    resolve({
                        agreement,
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
