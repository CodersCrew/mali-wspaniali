import firebaseApp from 'firebase/app';
import { Agreement } from './types';
import { logQuery } from '../utils/logQuery';
import { OnSnapshotCallback } from './userRepository';
import { incrementLoaderRequests, decrementLoaderRequests } from '../utils/load';

export const agreementRepository = (db: firebaseApp.firestore.Firestore) => ({
    getAgreements: async (onSnapshotCallback: OnSnapshotCallback<Agreement[]>) => {
        incrementLoaderRequests();
        db.collection('agreement')
            .orderBy('required', 'desc')
            .onSnapshot(snapshot => {
                decrementLoaderRequests();
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
