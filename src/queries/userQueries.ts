import { User } from '@firebase/auth-types';
import { firebase } from '../firebase/firebase';
import { RegistrationUser } from '../pages/RegistrationPage/types';
import { OnSnapshotCallback } from '../firebase/userRepository';
import { Parent } from '../pages/ParentProfile/types';
import { Document } from '../firebase/types';

export const createUser = async (user: RegistrationUser): Promise<User | null> => {
    const userData = await firebase.auth.handleCreateUserWithEmailAndPassword(user.email, user.password);

    return userData.user || null;
};

export const getUsersData = async (rowsPerPage: number, last: Document | null, first: Document | null) => {
    const { users, unsubscribe, newLastVisible, newFirstVisible } = await firebase.user.getUsersData(
        rowsPerPage,
        last,
        first,
    );
    return { users, unsubscribe, newLastVisible, newFirstVisible };
};

export const getUserById = (id: string, onSnapshotCallback: OnSnapshotCallback<Parent>) =>
    firebase.user.getUserById(id, onSnapshotCallback);

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
