import firebaseApp from 'firebase/app';
import { InvitationCode } from './types';
import { logQuery } from '../utils/logQuery';

type dataPromiseTypes = {
    invitationCode: InvitationCode[];
    unsubscribe: () => void;
};

export const invitationCodeRepository = (db: firebaseApp.firestore.Firestore) => ({
    getInvitationCodeData: () => {
        const invitationCode: InvitationCode[] = [];
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    const docData = doc.data() as InvitationCode;
                    docData.invitationCodeId = doc.id;
                    invitationCode.push(docData);
                });
            }
        };
        const getQuery = (
            resolve: (value: dataPromiseTypes) => void,
            reject: (reason: Error) => void,
        ): (() => void) => {
            const agreementRef = db.collection('invitation-code');
            const unsubscribe = agreementRef.onSnapshot(
                snapshot => {
                    logQuery(snapshot);
                    handleData(snapshot);
                    resolve({
                        invitationCode,
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
