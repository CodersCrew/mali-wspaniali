import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';
import {authRepository} from './authRepository';

firebaseApp.initializeApp(config);

export const firebase = {
    auth: authRepository
};
