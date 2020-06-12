import firebase from 'firebase/app';
import { logQuery } from '../utils/logQuery';
import { OnSnapshotCallback } from './userRepository';
import { Kindergarten } from './types';
import { incrementLoaderRequests, decrementLoaderRequests } from '../utils/load';

export const kindergartenRepository = (firestore: firebase.firestore.Firestore) => ({
    getKindergartens: (onSnapshotCallback: OnSnapshotCallback<Kindergarten[]>) => {
        incrementLoaderRequests();
        firestore.collection('kindergarten').onSnapshot(snapshot => {
            decrementLoaderRequests();
            logQuery(snapshot);
            const kindergartens: Kindergarten[] = [];
            snapshot.forEach(document => {
                kindergartens.push(document.data() as Kindergarten);
                kindergartens[kindergartens.length - 1].id = document.id;
            });
            return onSnapshotCallback(kindergartens);
        });
    },
});
