import firebaseApp from 'firebase/app';
import 'firebase/auth';

export const authRepository = (auth: firebaseApp.auth.Auth) => ({
    handleSession: () => auth.setPersistence(firebaseApp.auth.Auth.Persistence.SESSION),
    handleSignOut: () => auth.signOut(),
    handlePasswordReset: (email: string) => auth.sendPasswordResetEmail(email),
    handlePasswordUpdate: (password: string) => {
        if (auth.currentUser) {
            auth.currentUser.updatePassword(password);
        }
    },
    onAuthStateChanged: (onAuthStateChangedFunction: (user: firebaseApp.User | null) => void) =>
        auth.onAuthStateChanged(onAuthStateChangedFunction),
    getCurrentUser: (): firebaseApp.User | null => auth.currentUser,
});
