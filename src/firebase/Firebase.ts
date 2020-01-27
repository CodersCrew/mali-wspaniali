import firebase, {Observer} from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

type UserCredential = firebase.auth.UserCredential;

class Firebase {
    private auth: firebase.auth.Auth;

    firestore: firebase.firestore.Firestore
    
    constructor() {
        firebase.initializeApp(config);

        this.auth = firebase.auth();
        this.firestore = firebase.firestore();
    }

    doCreateUserWithEmailAndPassword = (email: string, password: string): void => {
        this.auth.createUserWithEmailAndPassword(email, password);
    }

    doSignInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = (): void => {
        this.auth.signOut();
    }

    doPasswordReset = (email: string): void => {
        this.auth.sendPasswordResetEmail(email);
    }

    doPasswordUpdate = (password: string): void => {
        if (this.auth.currentUser) {
            this.auth.currentUser.updatePassword(password);
        }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAuthStateChanged = (onAuthStateChangedFunction: Observer<any, Error>): void => {
        this.auth.onAuthStateChanged(onAuthStateChangedFunction);
    } 
}

export default new Firebase();
