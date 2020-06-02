import firebase from 'firebase/app';
import { Parent } from '../pages/ParentProfile/types';
import { logQuery } from '../utils/logQuery';
import { Document, User } from './types';

type dataPromiseTypes = {
    users: User[];
    unsubscribe: () => void;
    newLastVisible: Document | null;
    newFirstVisible: Document | null;
};

export type OnSnapshotCallback<T extends firebase.firestore.DocumentData> = (data: T) => void;

export const userRepository = (firestore: firebase.firestore.Firestore) => ({
    getUserById: (id: string, onSnapshotCallback: OnSnapshotCallback<Parent>) => {
        return firestore
            .collection('user')
            .doc(id)
            .onSnapshot(snapshot => {
                logQuery(snapshot);
                const parentData = snapshot.data() as Parent;
                if (parentData) {
                    onSnapshotCallback(parentData);
                }
            });
    },
    getUsersData: (
        rowsPerPage: number,
        previousLastVisible: Document | null,
        previousFirstVisible: Document | null,
    ): Promise<dataPromiseTypes> => {
        const users: User[] = [];
        let newFirstVisible: Document | null = null;
        let newLastVisible: Document | null = null;
        const handleData = (snapshot: firebase.firestore.QuerySnapshot) => {
            if (!snapshot.empty) {
                [newFirstVisible] = snapshot.docs;
                newLastVisible = snapshot.docs[snapshot.docs.length - 1];
                snapshot.forEach(doc => {
                    const docData = doc.data() as User;
                    users.push(docData);
                    users[users.length - 1].id = doc.id;
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
            const userRefWithLimit = firestore
                .collection('user')
                .orderBy('role')
                .limit(rowsPerPage);
            if (previousLastVisible && !previousFirstVisible) {
                const unsubscribe = userRefWithLimit.startAfter(previousLastVisible).onSnapshot(
                    snapshot => {
                        handleData(snapshot);
                        resolve({
                            users,
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
                const unsubscribe = userRefWithLimit.endBefore(previousFirstVisible).onSnapshot(
                    snapshot => {
                        handleData(snapshot);
                        resolve({
                            users,
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
                        users,
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
    getParents: (onSnapshotCallback: OnSnapshotCallback<Parent[]>) => {
        return firestore
            .collection('user')
            .where('role', '==', 'parent')
            .onSnapshot(snapshot => {
                logQuery(snapshot);
                const parents: Parent[] = [];
                snapshot.forEach(document => {
                    parents.push(document.data().email as Parent);
                });
                return onSnapshotCallback(parents);
            });
    },
});
