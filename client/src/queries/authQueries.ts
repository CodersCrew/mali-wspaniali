import { firebase, User } from '../firebase/firebase';

type OnAuthStateChangedCallback = (user: User | null) => void;

export const onAuthStateChanged = (callback: OnAuthStateChangedCallback) => {
    firebase.auth.onAuthStateChanged(callback);
};

export const handleSignOut = () => firebase.auth.handleSignOut();

export const handlePasswordReset = (email: string) => firebase.auth.handlePasswordReset(email);
