import firebaseApp from 'firebase/app';
import 'firebase/auth';
import * as firebase from 'firebase'

//firebase.auth() = firebaseApp.auth.Auth

export const authRepository = (auth: firebaseApp.auth.Auth) => ({
    handleSession: ()=>  auth.setPersistence(firebase.auth.Auth.Persistence.SESSION),
    handleCreateUserWithEmailAndPassword: (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password),
    handleSignInWithEmailAndPassword: (email: string, password: string) => auth.signInWithEmailAndPassword(email, password),
    handleSignOut: () => auth.signOut(),
    handlePasswordReset: (email: string) => auth.sendPasswordResetEmail(email),
    handlePasswordUpdate: (password: string) => {
        if (auth.currentUser) {
            auth.currentUser.updatePassword(password);
        }
    },
    onAuthStateChanged: (onAuthStateChangedFunction: (user: firebaseApp.User | null) => void) => auth.onAuthStateChanged(onAuthStateChangedFunction),
    getCurrentUser: (): firebaseApp.User | null => auth.currentUser    
});