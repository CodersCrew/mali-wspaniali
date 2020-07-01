import firebase from 'firebase/app';
import { OnSnapshotCallback } from './userRepository';
import { Advice } from './types';

export const adviceRepository = (firestore: firebase.firestore.Firestore) => ({
    getAdviceByResultAndAge: (result: string, ageGroup: string, onSnapshotCallback: OnSnapshotCallback<Advice>) => {
        firestore
            .collection('advice')
            .where('result', '==', result)
            .where('ageGroup', '==', ageGroup)
            .limit(1)
            .onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    const advice = snapshot.docs[0].data() as Advice;

                    return onSnapshotCallback(advice);
                }

                return null;
            });
    },
    getAdviceByResult: (result: string, onSnapshotCallback: OnSnapshotCallback<Advice>) => {
        firestore
            .collection('advice')
            .where('result', '==', result)
            .limit(1)
            .onSnapshot(snapshot => {
                if (!snapshot.empty) {
                    const advice = snapshot.docs[0].data() as Advice;

                    return onSnapshotCallback(advice);
                }

                return null;
            });
    },
});
