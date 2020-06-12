import firebase from 'firebase/app';
import { Parent } from '../pages/ParentProfile/types';
import { logQuery } from '../utils/logQuery';
import { UserAgreement, Document, User } from './types';
import { incrementLoaderRequests, decrementLoaderRequests, load } from '../utils/load';

type dataPromiseTypes = {
    users: User[];
    unsubscribe: () => void;
    newLastVisible: Document | null;
    newFirstVisible: Document | null;
};

export type OnSnapshotCallback<T extends firebase.firestore.DocumentData> = (data: T) => void;

export const userRepository = (firestore: firebase.firestore.Firestore) => ({
    getUserById: (id: string, onSnapshotCallback: OnSnapshotCallback<Parent>) => {
        incrementLoaderRequests();
        return firestore
            .collection('user')
            .doc(id)
            .onSnapshot(snapshot => {
                decrementLoaderRequests();
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
        const getUsersData = new Promise<dataPromiseTypes>((resolve, reject) => {
            getQuery(resolve, reject);
        });
        return load(getUsersData);
    },
    getParents: (onSnapshotCallback: OnSnapshotCallback<Parent[]>) => {
        incrementLoaderRequests();
        return firestore
            .collection('user')
            .where('role', '==', 'parent')
            .onSnapshot(snapshot => {
                decrementLoaderRequests();
                logQuery(snapshot);
                const parents: Parent[] = [];
                snapshot.forEach(document => {
                    parents.push(document.data().email as Parent);
                });
                onSnapshotCallback(parents);
            });
    },
    getUserAgreements(userId: string, callback: OnSnapshotCallback<UserAgreement[]>) {
        incrementLoaderRequests();
        firestore
            .collection('user')
            .doc(userId)
            .collection('agreements')
            .onSnapshot(snapshot => {
                decrementLoaderRequests();
                const results = snapshot.docs.map(snap => {
                    const data = snap.data();

                    return {
                        ...data,
                        id: snap.id,
                    } as UserAgreement;
                });
                if (results) {
                    callback(results);
                }
            });
    },
    toggleAgreement: (userId: string, userAgreementId: string, value: boolean) => {
        firestore
            .collection('user')
            .doc(userId)
            .collection('agreements')
            .doc(userAgreementId)
            .update({ checked: value });
    },
});
