import { firebase, User, UserCredential } from '../firebase/firebase';

type OnAuthStateChangedCallback = (user: User | null) => void;

export const handleSignInWithEmailAndPassword = (
    email: string,
    password: string,
    successCallback: (value: UserCredential) => void,
    failCallback: (error: Error) => void,
) => {
    firebase.auth.handleSession().then(() => {
        firebase.auth
            .handleSignInWithEmailAndPassword(email, password)
            .then(successCallback)
            .catch(failCallback);
    });
};

export const onAuthStateChanged = (callback: OnAuthStateChangedCallback) => {
    firebase.auth.onAuthStateChanged(callback);
};

export const getUserRole = async (user: User): Promise<string> => {
    const idTokenResult = await user.getIdTokenResult();
    return idTokenResult.claims.role;
};

export const handleLogout = () => {
    firebase.auth.handleSignOut();
};
