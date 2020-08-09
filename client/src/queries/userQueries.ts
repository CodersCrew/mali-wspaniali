import { FetchResult } from 'apollo-boost';
import { ReturnedStatus, UserInput } from '../graphql/types';
import { firebase } from '../firebase/firebase';
import { OnSnapshotCallback } from '../firebase/userRepository';
import { Document } from '../firebase/types';
import * as UserRepository from '../graphql/userRepository';

export const createUser = (user: UserInput): Promise<FetchResult<ReturnedStatus>> => {
    return UserRepository.createUser(user);
};

export const getUsersData = async (rowsPerPage: number, last: Document | null, first: Document | null) => {
    const { users, unsubscribe, newLastVisible, newFirstVisible } = await firebase.user.getUsersData(
        rowsPerPage,
        last,
        first,
    );

    return { users, unsubscribe, newLastVisible, newFirstVisible };
};

export const getCurrentUser = () => {
    return firebase.auth.getCurrentUser();
};

export const getCurrentUserIdToken = async () => {
    const currentUser = firebase.auth.getCurrentUser();
    let idToken;
    if (currentUser) {
        idToken = await currentUser.getIdToken();
    }

    return idToken;
};

export const getParents = (onSnapshotCallback: OnSnapshotCallback<any[]>) => {
    firebase.user.getParents(onSnapshotCallback);
};

export const toggleUserAgreement = (userId: string, userAgreementId: string, value: boolean) => {
    firebase.user.toggleAgreement(userId, userAgreementId, value);
};
