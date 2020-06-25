import firebaseApp from 'firebase/app';
import { Agreement } from './types';
import { logQuery } from '../utils/logQuery';
import { OnSnapshotCallback } from './userRepository';

export const agreementRepository = (db: firebaseApp.firestore.Firestore) => ({
    getAgreements: async (onSnapshotCallback: OnSnapshotCallback<Agreement[]>) => {
        db.collection('agreement')
            .orderBy('required', 'desc')
            .onSnapshot(snapshot => {
                logQuery(snapshot);
                const results = snapshot.docs.map(snap => {
                    const data = snap.data();

                    return {
                        ...data,
                        id: snap.id,
                    } as Agreement;
                });
                if (results) {
                    onSnapshotCallback(results);
                }
            });
    },
});
