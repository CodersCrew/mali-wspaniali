import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';
import { authRepository } from './authRepository';
import { childRepository } from './childRepository';

firebaseApp.initializeApp(config);

const auth = firebaseApp.auth();
const childQueries = firebaseApp.firestore();

export const firebase = {
    auth: authRepository(auth),
    childQueries: childRepository(childQueries)
};
