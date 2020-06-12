import firebaseApp from 'firebase/app';
import 'firebase/firestore';
import { Document, Child, Result } from './types';
import { OnSnapshotCallback } from './userRepository';
import { logQuery } from '../utils/logQuery';
import { incrementLoaderRequests, decrementLoaderRequests, load } from '../utils/load';

type dataPromiseTypes = {
    documents: Child[];
    unsubscribe: () => void;
    newLastVisible: Document | null;
    newFirstVisible: Document | null;
};

export const childRepository = (db: firebaseApp.firestore.Firestore) => ({
    getChildDocById: (childId: string, onSnapshotCallback: OnSnapshotCallback<Child>) => {
        incrementLoaderRequests();
        db.collection('child')
            .doc(childId)
            .onSnapshot(snapshot => {
                decrementLoaderRequests();
                logQuery(snapshot);
                const childData = snapshot.data() as Child;
                if (childData) {
                    onSnapshotCallback(childData);
                }
            });
    },
    getChildResults: async (childId: string, onSnapshotCallback: OnSnapshotCallback<Result[]>) => {
        incrementLoaderRequests();
        db.collection('child')
            .doc(childId)
            .collection('results')
            .onSnapshot(snapshot => {
                decrementLoaderRequests();
                logQuery(snapshot);
                const results = snapshot.docs.map(snap => {
                    const data = snap.data();

                    return {
                        ...data,
                        dateOfTest: data.dateOfTest.toDate(),
                        updatedAt: data.updatedAt.toDate(),
                    } as Result;
                });
                if (results) {
                    onSnapshotCallback(results);
                }
            });
    },
    getChildrenByUserId: (id: string, onSnapshotCallback: OnSnapshotCallback<Child[]>) => {
        incrementLoaderRequests();
        return db
            .collection('child')
            .where('userId', '==', id)
            .onSnapshot(snapshot => {
                decrementLoaderRequests();
                const children = snapshot.docs.map(doc => {
                    const child = doc.data() as Child;
                    child.id = doc.id;
                    return child;
                });
                return onSnapshotCallback(children);
            });
    },
    getChildrenData: (
        rowsPerPage: number,
        previousLastVisible: Document | null,
        previousFirstVisible: Document | null,
    ): Promise<dataPromiseTypes> => {
        const documents: Child[] = [];
        let newFirstVisible: Document | null = null;
        let newLastVisible: Document | null = null;
        const handleData = (snapshot: firebaseApp.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                [newFirstVisible] = snapshot.docs;
                newLastVisible = snapshot.docs[snapshot.docs.length - 1];
                snapshot.forEach(doc => {
                    const docData = doc.data() as Child;
                    documents.push(docData);
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
            const childRefWithLimit = db
                .collection('child')
                .orderBy('lastName')
                .limit(rowsPerPage);
            if (previousLastVisible && !previousFirstVisible) {
                const unsubscribe = childRefWithLimit.startAfter(previousLastVisible).onSnapshot(
                    snapshot => {
                        logQuery(snapshot);
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
                const unsubscribe = childRefWithLimit.endBefore(previousFirstVisible).onSnapshot(
                    snapshot => {
                        logQuery(snapshot);
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
            // incrementLoaderRequests();
            const unsubscribe = childRefWithLimit.onSnapshot(
                snapshot => {
                    // decrementLoaderRequests();
                    logQuery(snapshot);
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
        const getChildrenData = new Promise<dataPromiseTypes>((resolve, reject) => {
            getQuery(resolve, reject);
        });
        return load(getChildrenData);
    },
});
