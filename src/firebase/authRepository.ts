import firebaseApp from 'firebase/app';
import 'firebase/auth';
import { load } from '../utils/load';

export const authRepository = (auth: firebaseApp.auth.Auth) => ({
    handleSession: () => auth.setPersistence(firebaseApp.auth.Auth.Persistence.SESSION),
    handleCreateUserWithEmailAndPassword: (email: string, password: string) =>
    {
        return load(auth.createUserWithEmailAndPassword(email, password));
    },
    handleSignInWithEmailAndPassword: (email: string, password: string) => {
        return load(auth.signInWithEmailAndPassword(email, password));
    },
    handleSignOut: () => {
        return load(auth.signOut());
    },
    handlePasswordReset: (email: string) => {
        return load(auth.sendPasswordResetEmail(email));
    },
    handlePasswordUpdate: (password: string) => {
        if (auth.currentUser) {
            load(auth.currentUser.updatePassword(password));
        }
    },
    onAuthStateChanged: (onAuthStateChangedFunction: (user: firebaseApp.User | null) => void) =>
        auth.onAuthStateChanged(onAuthStateChangedFunction),
    getCurrentUser: (): firebaseApp.User | null => auth.currentUser,
});
